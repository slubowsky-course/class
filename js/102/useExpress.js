import express from 'express';

const app = express();

app.get('/', (req, res, next) => {
  res.end('Hello Express!');
});

app.get('/getData', (req, res, next) => {
  const potus = {
    first: 'Donald',
    last: 'Trump'
  };
  //res.setHeader('content-type', 'application/json');
  //res.end(JSON.stringify(potus));
  res.send(potus);
  //res.send('im a string');
});

app.use('/sayHello', (req, res, next) => {
  res.end(`Hello ${req.query.name || 'no name'}`);
});

app.param('id', (req, res, next) => {
  // look up user in db...
  const user = {
    id: req.params.id,
    first: 'Donald',
    last: 'Trump'
  };
  req.user = user;
  next();
});

app.get('/sayHello2/:id', (req, res, next) => {
  /* look up user in db...
  const user = {
    id: req.params.id,
    first: 'Donald',
    last: 'Trump'
  };
  res.end(`Hello ${user.first} ${user.last} - id = ${user.id}`);*/

  res.end(`Hello ${req.user.first} ${req.user.last} - id = ${req.user.id}`);
});

app.get('/sayGoodbye2/:id', (req, res, next) => {
  /* look up user in db...
  const user = {
    id: req.params.id,
    first: 'Donald',
    last: 'Trump'
  };
  res.end(`Goodbye ${user.first} ${user.last} - id = ${user.id}`);*/

  res.end(`Goodbye ${req.user.first} ${req.user.last} - id = ${req.user.id}`);
});

app.listen(80);
