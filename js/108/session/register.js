const pool = require('./pool.js');
const bcrypt = require('bcrypt');

module.exports = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    if (!username || !password) {
      throw new Error('Username and password are required');
    }

    const hash = await bcrypt.hash(password, 10);

    // of course dont store real passwords in db. We will fix...
    const [results] = await pool.execute('INSERT INTO users (username, password) VALUES (?, ?)', [req.body.username, hash]);

    console.log(results);

    res.redirect('/');
  } catch (e) {
    console.log(e);

    if (e.errno === 1062) {
      return next(/*new Error(*/`${username} is already taken. Please try a different one.`/*)*/);
    }
    next(e);
  }
};
