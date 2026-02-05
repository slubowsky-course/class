export default (req, res, next) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  req.searchParams = url.searchParams;
  next();
}
