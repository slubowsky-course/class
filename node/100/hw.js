import express from 'express';

const app = express();

/*app.query('a', (req, res, next, a) => {
  req.a = Number(a);
  if (isNaN(req.a)) {
    const error = new Error(`a of ${a} is not a valid number`);
    error.statusCode = 400;
    throw error;
  }
  next();
});

app.query('b', (req, res, next, b) => {
  req.b = Number(b);
  if (isNaN(req.b)) {
    const error = new Error(`b of ${b} is not a valid number`);
    error.statusCode = 400;
    throw error;
  }
  next();
});*/

app.get('/add', (req, res, next) => {
  // console.log(req.query);
  const a = Number(req.query.a);
  const b = Number(req.query.b);

  if (isNaN(a)) {
    const error = new Error(`a of ${req.query.a} is not a valid number`);
    error.statusCode = 400;
    // return next(error);
    throw error;
  }

  if (isNaN(b)) {
    const error = new Error(`b of ${req.query.b} is not a valid number`);
    error.statusCode = 400;
    // return next(error);
    throw error;
  }

  res.send(`${a + b}`);
});

app.get('/subtract', (req, res, next) => {
  // console.log(req.query);
  const a = Number(req.query.a);
  const b = Number(req.query.b);

  if (isNaN(a)) {
    const error = new Error(`a of ${req.query.a} is not a valid number`);
    error.statusCode = 400;
    // return next(error);
    throw error;
  }

  if (isNaN(b)) {
    const error = new Error(`b of ${req.query.b} is not a valid number`);
    error.statusCode = 400;
    // return next(error);
    throw error;
  }

  res.send(`${Number(req.query.a) - Number(req.query.b)}`);
});

app.param('a', (req, res, next, a) => {
  req.a = Number(req.params.a);
  if (isNaN(a)) {
    const error = new Error(`a of ${req.query.a} is not a valid number`);
    error.statusCode = 400;
    // return next(error);
    throw error;
  }
  next();
});

app.get('/add/:a/:b', (req, res, next) => {
  // console.log(req.query);
  //const a = Number(req.params.a);
  const b = Number(req.params.b);

  /*if (isNaN(a)) {
    const error = new Error(`a of ${req.query.a} is not a valid number`);
    error.statusCode = 400;
    // return next(error);
    throw error;
  }*/

  if (isNaN(b)) {
    const error = new Error(`b of ${req.query.b} is not a valid number`);
    error.statusCode = 400;
    // return next(error);
    throw error;
  }

  res.send(`${req.a + b}`);
});


app.get('/:operator/:a/:b', (req, res, next) => {
  const a = req.a;
  const b = Number(req.params.b);
  if (isNaN(b)) {
    const error = new Error(`b of ${req.query.b} is not a valid number`);
    error.statusCode = 400;
    // return next(error);
    throw error;
  }

  let answer;

  switch(req.params.operator) {
    case '+':
      answer = a + b;
      break;
    case '-':
      answer = a - b;
      break;
    case '*':
      answer = a * b;
      break;
    case '/':
      answer = a / b;
      break;
    default:
      const error = new Error(`${req.params.operator} is not a supported operator`);
      error.statusCode = 400;
      throw error;
  }

  res.send(`${answer}`);
});

app.use((error, req, res, next) => {
  res.send(`oops - ${error}`);
});
app.listen(80);
