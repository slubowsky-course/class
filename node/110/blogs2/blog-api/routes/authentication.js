import express from 'express';
import bcrypt from 'bcrypt';
import Joi from 'joi';
import User from '../models/User.js';

const userSchema = Joi.object({
  userName: Joi.string()
    .alphanum()
    .min(3)
    .max(20)
    .required(),

  password: Joi.string()
    .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
});

const router = express.Router();

router.post('/login', async (req, res, next) => {
  try {
    const result = await User.findOne({userName: req.body.userName});

    if (result) {
      if (await bcrypt.compare(req.body.password, result.hash)) {
        req.session.userName = req.body.userName;
        return res.sendStatus(204);
      }
    }

    const error = new Error('Invalid username and/or password');
    error.statusCode = 401;
    throw(error);
  } catch (e) {
    next(e);
  }
});

router.post('/logout', (req, res, next) => {
  req.session.destroy();
  res.sendStatus(204);
});

router.post('/register', async (req, res, next) => {
  const { error } = userSchema.validate(req.body, { abortEarly: false });
  if (error) {
    error.statusCode = 422;
    return next(error);
  }

  try {
    const hash = await bcrypt.hash(req.body.password, 10);

    const user = new User({ userName: req.body.userName, hash });
    await user.save();

    res.sendStatus(201);
  } catch (e) {
    console.log(e);

    if (e.errorResponse.code === 11000) {
      return next(new Error(`Username ${req.body.userName} already in use. Please choose another`));
    }

    next(e);
  }
});

export default router;
