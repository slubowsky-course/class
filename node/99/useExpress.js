import express from 'express';

const app = express();

app.get('/foo', (req, res, next) => {
  res.end('Hello Express!');
});

app.get('/getData', (req, res, next) => {
  const fromDatabase = {
    id: 1,
    first: 'Donald',
    last: 'Trump'
  };

  //res.setHeader('content-type', 'application/json');
  //res.end(JSON.stringify(fromDatabase));
  res.send(fromDatabase);
  //res.send('foo');

  //next();
});

/*app.use((req, res, next) => {
  //res.end('will this crash?');
});*/

app.get('/sayHello', (req, res, next) => {
  res.send(`Hello ${req.query.name}`)
});

app.get('/sayHello2/:name', (req, res, next) => {
  res.send(`Hello ${req.params.name}`)
});

app.param('id', (req, res, next) => {
  const pretendLookedUpFromDatabase = {
    id: req.params.id,
    first: 'Donald',
    last: 'Trump'
  };

  req.user = pretendLookedUpFromDatabase;

  next();
});

app.get('/sayHello3/:id', (req, res, next) => {
  /*const pretendLookedUpFromDatabase = {
    id: req.params.id,
    first: 'Donald',
    last: 'Trump'
  };

  res.send(`Hello ${pretendLookedUpFromDatabase.first} ${pretendLookedUpFromDatabase.last}`);*/

  res.send(`Hello ${req.user.first} ${req.user.last}`);
});

app.get('/sayGoodbye3/:id', (req, res, next) => {
  /*const pretendLookedUpFromDatabase = {
    id: req.params.id,
    first: 'Donald',
    last: 'Trump'
  };

  res.send(`Goodbye ${pretendLookedUpFromDatabase.first} ${pretendLookedUpFromDatabase.last}`);*/

  res.send(`Goodbye ${req.user.first} ${req.user.last}`);
});

app.get('/foobar/:id',(req, res, next) => {
  console.log('req.user=', req.user);
  //next();
  res.send('foobar');
});

app.listen(80);
