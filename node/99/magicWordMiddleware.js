export default (options) => {
  return (req, res, next) => {
    if (req.query.magicWord === options?.magicWord || 'please') {
      return next();
    }

    res.statusCode = 401;
    res.end('nothing for you');
  };
}
