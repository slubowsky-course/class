import connect from 'connect';

const app = connect();

/*app.use((req, res, next) => {
  res.write('Hello from connect');
  next();
});

app.use('/middle', (req, res, next) => {
  res.write('Im in the middle');
  next();
});

app.use((req, res) => {
  res.end('Goodbye from connect');
});*/

app.use((req, res, next) => {
  res.setHeader('content-type', 'text/html');
  next();
});

app.use('/index.html', (req, res, next) => {
  res./*write*/end('<h1>Hello from connect. This is index</h1>');
  // next();
});

app.use('/about.html', (req, res, next) => {
  res./*write*/end('<h2>This is about</h2>');
  // next();
});

app.use((req, res, next) => {
  res./*write*/end('<h4>404 - page not found</h4>');
  next();
});

/*app.use((req, res, next) => {
  res.end('<h5>Copyright &copy; PCS 2025</h5>');
  // next();
});*/

app.listen(80);
