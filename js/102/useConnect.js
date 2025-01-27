import connect from 'connect';
import queryParamsMiddleware from './queryParamsMiddleware.js';
import logger from './logger.js';

const app = connect();

/*app.use((req, res, next) => {
  const now = new Date();
  console.log(`${now.toLocaleDateString()} ${now.toLocaleTimeString()} - ${req.url}`);

  next();
});*/

app.use(logger);

/*app.use((req, res,  next) => {
  res.setHeader('content-type', 'text/html');
  next();
});*/

app.use('/index.html', (req, res, next) => {
  res.end('first');
  //next();
});

app.use('/about.html', (req, res, next) => {
  res.end('second');
  //next();
});

app.use('/error', (req, res, next) => {
  foo();
});

/*app.use((req, res, next) => {
  const url = new URL(req.url, `http://${req.headers.host}/`);
  req.searchParams = url.searchParams;

  req.name = req.searchParams.get('name') || 'no name'
  next();
});*/

//app.use(require('./queryParamsMiddleware.js'));

app.use(queryParamsMiddleware);

app.use('/sayHello', (req, res, next) => {
  //const url = new URL(req.url, `http://${req.headers.host}/`);
  res.end(`Hello ${/*url*/req.searchParams.get('name') || 'no name' /*req.name*/}`);
});

app.use('/sayGoodbye', (req, res, next) => {
  //const url = new URL(req.url, `http://${req.headers.host}/`);
  res.end(`Goodbye ${/*url*/req.searchParams.get('name') || 'no name'}`);
});

app.use((req, res, next) => {
  /*res.statusCode = 404;
  res.end('<h5>404 - page not found</h5>');
  next();*/

  const error = new Error('404 - page not found');
  error.statusCode = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.statusCode = error.statusCode || 500;
  res.write(`oops - ${error.message}`);
  //next(error);
  next();
});

app.use((error, req, res, next) => {
  res.end(' end error middleware');
});

app.use((req, res, next) => {
  res.end(' end NON error middleware');
});

app.listen(80);
