import express from 'express';
import debug from 'debug';
debug('contacts-api:router');
import pool from '../pool.js';
import Joi from 'joi';

const router = express.Router();

const contactSchema = Joi.object({
  first: Joi.string()
    .alphanum()
    .min(3)
    .max(7)
    .required(),

  last: Joi.string().trim().required(),

  phone: Joi.string(),

  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
});

router.route('/')
  .get(async (req, res, next) => {
    debug('serving index');

    try {
      const [results] = await pool.execute(
        'SELECT id, first, last, email, phone FROM contacts'
      );

      res.json(results);
    } catch (err) {
      return next(err);
    }
  })
  .post(async (req, res, next) => {

    /*if (!req.body.first || req.body.first.length < 3 || req.body.first.length > 7) {
      const error = new Error('first name is required and must be between 3 and 7 characters long');
      error.status = 422;
      throw error;
    }*/

    const { error } = contactSchema.validate(req.body, { abortEarly: false });
    if (error) {
      /*const e = new Error(error.message);
      e.status = 422;*/
      error.status = 422;
      throw (error);
    }

    try {
      const [results] = await pool.execute(
        `INSERT INTO contacts(first, last, email, phone) VALUES (?,?,?,?)`,
        [req.body.first, req.body.last, req.body.email, req.body.phone]
      );

      console.log(results);
      req.body.id = results.insertId;

      res.status(201)
        .location(`/contacts-api/${req.body.id}`)
        .json(req.body);
    } catch (err) {
      return next(err);
    }
  });

router.route('/:id')
  .get(async (req, res, next) => {
    debug(`serving ${req.params.id}`);

    try {
      const [results] = await pool.execute(
        'SELECT id, first, last, email, phone FROM contacts WHERE id = ?', [req.params.id]
      );

      if (!results.length) {
        res.statusCode = 404;
        return res.send(`Cant find contact ${req.params.id}`);
      }

      res.json(results[0]);
    } catch (err) {
      return next(err);
    }
  })
  .put(async (req, res, next) => {
    debug(`updating ${req.params.id}`);

    /*if (!req.body.first || req.body.first.length < 3 || req.body.first.length > 7) {
      const error = new Error('first name is required and must be between 3 and 7 characters long');
      error.status = 422;
      throw error;
    }*/

    const { error } = contactSchema.validate(req.body, { abortEarly: false });
    if (error) {
      /*const e = new Error(error.message);
      e.status = 422;*/
      error.status = 422;
      throw (error);
    }

    try {
      const [results] = await pool.execute(
        'UPDATE contacts SET first = ?, last = ?, email = ?, phone = ? WHERE id = ?',
        [req.body.first, req.body.last, req.body.email, req.body.phone, req.params.id]
      );

      console.log(results);

      if (!results.affectedRows) {
        res.statusCode = 404;
        return res.send(`Cant find contact ${req.params.id}`);
      }

      res.statusCode = 204;
      res.end();
    } catch (err) {
      return next(err);
    }
  })
  .delete(async (req, res, next) => {
    debug(`deleting ${req.params.id}`);

    try {
      const [results] = await pool.execute(
        'DELETE FROM contacts WHERE id = ?', [req.params.id]
      );

      //console.log(results);

      if (!results.affectedRows) {
        res.statusCode = 404;
        return res.send(`Cant find contact ${req.params.id}`);
      }

      res.statusCode = 204;
      res.end();
    } catch (err) {
      return next(err);
    }
  });

router.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send(err.message);
});

export default router
