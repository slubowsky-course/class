import express from 'express';
//import magicWordMiddleware from './magicWordMiddleware.js';
import basicAuthMiddleware from './basicAuthMiddleware.js';

const app = express();

app.get('/index.html', (req, res, next) => {
  res.send('<h1>I am index.html</h1>');
});

app.get('/about.html', (req, res, next) => {
  res.send('<h1>I am about.html</h1>');
});

//app.use(magicWordMiddleware({ magicWord: 'open sesame' }));
app.use(basicAuthMiddleware({
  users: [
    { user: 'Donald', pwd: 'MAGA' },
    { user: 'JD', pwd: 'Tucker' }
  ]
}));

app.get('/admin.html', (req, res, next) => {
  res.send('<h1>I am admin.html</h1>');
});

app.listen(process.argv[2]);
