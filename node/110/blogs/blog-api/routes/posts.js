import express from 'express';
import authenticatedOnly from '../authenticatedOnly.js';
import Joi from 'joi';
import { ObjectId } from 'mongodb';

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

router.use(async (req, res, next) => {
  try {
    req.posts = await req.db.collection('posts');

    next();
  } catch (e) {
    next(e);
  }
});

router.route('/')
  .get(async (req, res, next) => {
    const posts = await req.posts.find()
      .sort({ date: 1 })
      .skip(Number(req.query.skip) ?? 0)
      .limit(Number(req.query.limit) ?? 100)
      //.project({comments: 0})
      .toArray()
    res.send(posts);
  })
  .post(authenticatedOnly, async (req, res, next) => {
    const { error } = postSchema.validate(req.body, { abortEarly: false });
    if (error) {
      error.statusCode = 422;
      return next(error);
    }

    try {
      req.body.date = new Date();
      req.body.author = req.session.userName;
      await req.posts.insertOne(req.body);

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
    const post = await req.posts.findOne({_id: new ObjectId(req.params.id)}/*, {projection: {comments: 0}}*/);
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
      const post = await req.posts.findOne({ _id: new ObjectId(req.params.id) }, {projection: {comments: 1, _id: 0}});
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
      req.body.date = new Date();
      req.body.author = req.session.userName ?? 'Khomeni';
      await req.posts.updateOne({_id: new ObjectId(req.params.id)}, { $push: {comments: req.body}});

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
