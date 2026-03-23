import express from 'express';
import authenticatedOnly from '../authenticatedOnly.js';
import Joi from 'joi';
import { ObjectId } from 'mongodb';
import Post from '../models/Post.js';

const postSchema = Joi.object({
  title: Joi.string()
    .alphanum()
    .min(3)
    .max(100)
    .required(),

  body: Joi.string()
    .alphanum()
    .min(3)
    .max(1000)
    .required()
});

const router = express.Router();

router.route('/')
  .get(async (req, res, next) => {
    const posts = await Post.find()
      .sort({ date: 1 })
      .skip(Number(req.query.skip) ?? 0)
      .limit(Number(req.query.limit) ?? 100);
      //.project({comments: 0})

    res.send(posts);
  })
  .post(authenticatedOnly, async (req, res, next) => {
    const { error } = postSchema.validate(req.body, { abortEarly: false });
    if (error) {
      error.statusCode = 422;
      return next(error);
    }

    try {
      req.body.author = req.session.userName;

      const post = new Post(req.body);
      await post.save();

      req.io.emit('post', req.body);

      res.status(201)
        .location(`/posts/${req.body.id}`)
        .send(req.body);
    } catch (e) {
      next(e);
    }
  });

router.get('/:id', async (req, res, next) => {
  try {
    const post = await Post.findOne({_id: new ObjectId(req.params.id)}/*, {projection: {comments: 0}}*/);
    if (! post) {
      const error = new Error(`Post ${req.params.id} not found`);
      error.statusCode = 404;
      return next(error);
    }
    res.send(post);
  } catch(e) {
   next(e);
  }
});

router.route('/:id/comments')
  .get((async (req, res, next) => {
    try {
      const post = await Post.findOne({ _id: new ObjectId(req.params.id) }, {projection: {comments: 1, _id: 0}});
      if (!post) {
        const error = new Error(`Post ${req.params.id} not found`);
        error.statusCode = 404;
        return next(error);
      }
      res.send(post);
    } catch (e) {
      next(e);
    }
  }))
  .post(authenticatedOnly, async (req, res, next) => {
    try {
      req.body.author = req.session.userName ?? 'Khomeni';
      //await Post.updateOne({_id: new ObjectId(req.params.id)}, { $push: {comments: req.body}});

      const thePost = await Post.findOne({ _id: new ObjectId(req.params.id) });
      thePost.comments ??= [];
      thePost.comments.push(req.body);
      thePost.save();


      //req.body.postId = req.params.id
      req.io.emit('comment', {postId: req.params.id, comment: req.body});

      res.status(201)
        //.location
        .send(req.body);
    } catch (e) {
      next(e);
    }
  });

export default router;
