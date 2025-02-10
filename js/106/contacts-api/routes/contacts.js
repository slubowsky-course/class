import express from 'express';
const router = express.Router();
import pool from '../pool.js';
import debugLib from 'debug';
const debug = debugLib('contacts:api');

import Joi from 'joi';

const contactSchema = Joi.object({
  first: Joi.string()
    .alphanum()
    .min(3)
    .max(7)
    .required(),

  last: Joi.string().allow(''),

  phone: Joi.string(),

  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
});

/* GET home page. */
router.route('/')
  .get(async (req, res, next) => {
    debug('getting all contacts');
    try {
      const [results] = await pool.execute(
        'SELECT id, first, last, email, phone FROM contacts'
      );

      res.send(results);

    } catch (err) {
      next(err);
    }
  })
  .post(async (req, res, next) => {
    debug(`adding contact ${JSON.stringify(req.body)}`);

    try {
      const { error } = contactSchema.validate(req.body, { abortEarly: false });
      if (error) {
        //const e = new Error(error.message);
        error.status = 422;
        throw error;
      }

      const { first, last, email, phone } = req.body;

      /*if (!first || first.length < 3 || first.length > 7) {
        throw new Error('first is required and must be between 3 and seven characters');
      }*/

      const [results] = await pool.execute(
        'INSERT INTO contacts (first, last, email, phone) VALUES (?, ?, ?, ?)', [first, last, email, phone]
      );

      console.log(results);
      req.body.id = results.insertId;
      res.status(201)
        .location(`/contacts-api/${results.insertId}`)
        .send(req.body);

    } catch (err) {
      next(err);
    }
  });

router.route('/:id')
  .get(async (req, res, next) => {
    debug(`getting contact ${req.params.id}`);
    try {
      const [results] = await pool.execute(
        'SELECT id, first, last, email, phone FROM contacts WHERE id = ?', [req.params.id]
      );

      if (!results.length) {
        return res.status(404)
          .send(`Unable to find contact ${req.params.id}`);
      }

      res.send(results[0]);
    } catch (err) {
      next(err);
    }
  })
  .put(async (req, res, next) => {
    debug(`updating contact ${req.params.id} with ${JSON.stringify(req.body)}`);

    try {
      const { first, last, email, phone } = req.body;

      /*if (!first || first.length < 3 || first.length > 7) {
        throw new Error('first is required and must be between 3 and seven characters');
      }*/
      const { error } = contactSchema.validate(req.body, { abortEarly: false });
      if (error) {
        console.log(error);
        //const e = new Error(error.message);
        error.status = 422;
        throw error;
      }

      const [results] = await pool.execute(
        'UPDATE contacts SET first = ?, last = ?, email = ?, phone = ? WHERE id = ?', [first, last, email, phone, req.params.id]
      );

      if (!results.affectedRows) {
        return res.status(404)
          .send(`Unable to find contact ${req.params.id}`);
      }

      res.sendStatus(204);
    } catch (err) {
      next(err);
    }
  })
  .delete(async (req, res, next) => {
    debug(`deleting contact ${req.params.id}`);

    try {
      const [results] = await pool.execute(
        'DELETE FROM contacts WHERE id = ?', [req.params.id]
      );

      console.log(results);
      if (!results.affectedRows) {
        return res.status(404)
          .send(`Unable to find contact ${req.params.id}`);
      }

      res.end();
    } catch (err) {
      next(err);
    }
  });

router.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.send(err.message);
});

export default router;
