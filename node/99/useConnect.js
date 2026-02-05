import connect from 'connect';
import loggerMiddleware from './loggerMiddleware.js';
import queryParamMiddleware from './queryParamMiddleware.js';

const app = connect();

/*app.use((req, res, next) => {
  const now = new Date();
  console.log(`${now.toLocaleDateString()} ${now.toLocaleTimeString()} - ${req.url}`);
  next();
});*/

app.use(loggerMiddleware);

/*app.use((req, res, next) => {
  res.write('Hello from connect!');
  next();
});

app.use('/middle', (req, res, next) => {
  res.write('middle');
  next();
});

app.use((req, res) => {
  res.end('Goodbye from connect!');
});*/

app.use((req, res, next) => {
  res.setHeader('content-type', 'text/html');
  next();
});

app.use('/index.html', (req, res, next) => {
  res.write('<h1>This is index.html</h1>');
  next();
});

app.use('/about.html', (req, res, next) => {
  res.write('<h2>This is about.html</h2>');
  next();
});

app.use((error, req, res, next) => {
  res.write('<h4>THIS IS ON TOP OF ERROR. There was an error</h4>');
  //next(error);
  next();
});

app.use('/getError', (req, res) => {
  foo();
});

/*app.use((req, res) => {
  res.statusCode = 404;
  res.end('<h5>404 - page not found</h5>');
});*/

/*app.use((req, res, next) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  req.searchParams = url.searchParams;
  next();
});*/

app.use(queryParamMiddleware);

//app.use(require('./queryParamMiddleware.js'));

//console.log('line 49 being run');
//const searchParams = 'something';

app.use('/sayHello', (req, res, next) => {
  //const url = new URL(req.url, `http://${req.headers.host}`);
  //res.write(searchParams);
  res.write(`Hello ${/*url*/req.searchParams.get('name')}`);
  next();
});

app.use('/sayGoodbye', (req, res, next) => {
  //const url = new URL(req.url, `http://${req.headers.host}`);
  //res.write(searchParams);
  res.write(`Goodbye ${/*url*/req.searchParams.get('name')}`);
  next();
});

app.use((req, res) => {
  res.end('<h5>Copyright &copy; 2026 PCS</h5>');
})


app.use((error, req, res, next) => {
  res.write('<h4>OOPS. There was an error</h4>');
  //next(error);
  next();
});

app.use((error, req, res, next) => {
  res.end('<h3>OOPS2. There really was an error</h3>')
});

app.use((req, res) => {
  res.end('The end...');
});

app.listen(80);
