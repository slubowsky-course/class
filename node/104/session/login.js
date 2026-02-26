const pool = require('./pool.js');
const bcrypt = require('bcrypt');

module.exports = async (req, res, next) => {
  try {
    const [results] = await pool.execute('SELECT password FROM users WHERE userName = ?',
      [req.body.userName]);

    if (results.length) {

      //console.log(results);
      if (await bcrypt.compare(req.body.password, results[0].password)) {
        req.session.userName = req.body.userName;
        return res.redirect('/admin');
      }
    }

    res.redirect('/');
  } catch (e) {
    next(e);
  }
};
