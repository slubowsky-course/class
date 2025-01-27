export default (options) => {
  return (req, res, next) => {
    if (req.query.magicWord === (options?.magicWord || 'please')) {
      return next();
    }
    res.statusCode = 401;
    res.end('Sorry. You are not authorized to view this page');
  };
};
