import express from 'express';
// import magicWordMiddleware from './magicWordMiddleware.js';
import basicAuthMiddleware from './basicAuthMiddleware.js';

const app = express();

app.get('/index.html', (req, res, next) => {
  res.end('This is the index page');
});

app.get('/about.html', (req, res, next) => {
  res.end('This is the about page');
});

//app.use(magicWordMiddleware());//{magicWord: 'open sesame'}));

app.use(basicAuthMiddleware({users: [
  {
    name: 'Joe',
    password: '123'
  },
  {
    name: 'Donald',
    password: 'MAGA'
  }
]}));

app.get('/admin.html', (req, res, next) => {
  res.end('This is the admin page');
});

app.listen(process.argv[2]);
