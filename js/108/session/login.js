const pool = require('./pool.js');
const bcrypt = require('bcrypt');

module.exports = async (req, res, next) => {
  try {
    const [results] = await pool.execute('SELECT password FROM users WHERE username = ?', [req.body.username]);

    if (!results.length) {
      throw new Error('Bad username or password');
    }

    console.log(results);

    if (!await bcrypt.compare(req.body.password, results[0].password)) {
      throw new Error('Bad username or password');
    }

    req.session.username = req.body.username;

    return res.redirect('/admin');
  } catch (e) {
    next(e);
  }
};
