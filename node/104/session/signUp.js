const pool = require('./pool.js');
const bcrypt = require('bcrypt');

module.exports = async (req, res, next) => {
  try {
    const hash = await bcrypt.hash(req.body.password, 10);
    console.log(hash);

    const [results] = await pool.execute('INSERT INTO users(userName, password) VALUES(?, ?)',
      [req.body.userName, hash]);

    console.log(results);

    res.redirect('/');
  } catch (e) {
    console.log(e);

    // TBD - improve
    if (e.errno === 1062) {
      res.render('layout', {
        partials: { content: 'index' },
        errorMsg: `username ${req.body.userName} already in use`
      });
    }

    next(e);
  }
};
