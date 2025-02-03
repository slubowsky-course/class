var express = require('express');
var router = express.Router();
const pool = require ('../pool.js');

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

module.exports = router;
