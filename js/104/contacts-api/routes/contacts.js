import express from 'express';
const router = express.Router();
import pool from '../pool.js';
import debugLib from 'debug';
const debug = debugLib('contacts:api');

/* GET home page. */
router.get('/', async (req, res, next) => {
  try {
      const [results] = await pool.execute(
        'SELECT * FROM contacts'
      );

      res.send(results);

    } catch (err) {
      next(err);
    }
});

export default router;
