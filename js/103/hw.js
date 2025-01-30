import express from 'express';

const app = express();

app.query('a', (req, res, next, a) => {
  /*const*/ a = Number(a);//req.query.a);
  if (isNaN(a)) {
    return next(`a of '${a/*req.params.a*/}' is not a number`);
  }
  req.a = a;
  next();
});

app.get('/add', (req, res, next) => {
  console.log(req.query);

  const a = Number(req.query.a);
  const b = Number(req.query.b);

  if (isNaN(a)) {
    return next(`a of '${req.query.a}' is not a number`);
    //throw new Error(`a of '${req.query.a}' is not a number`);
  }

  if (isNaN(b)) {
    // return next(`b of '${req.query.b}' is not a number`);
    throw new Error(`b of '${req.query.b}' is not a number`);
  }

  res.end(`${a + b}`);
});

app.param('a', (req, res, next, a) => {
  /*const*/ a = Number(a);//req.params.a);
  if (isNaN(a)) {
    return next(`a of '${a/*req.params.a*/}' is not a number`);
  }
  req.a = a;
  next();
});

app.param('b', (req, res, next, b) => {
  /*const*/ b = Number(b);//req.params.b);
  if (isNaN(b)) {
    return next(`b of '${b/*req.params.b*/}' is not a number`);
  }
  req.b = b;
  next();
});

app.get('/add/:a/:b', (req, res, next) => {
  //const a = Number(req.params.a);
  //const b = Number(req.params.b);

  /*if (isNaN(a)) {
    return next(`a of '${req.params.a}' is not a number`);
    //throw new Error(`a of '${req.params.a}' is not a number`);
  }*/

  /*if (isNaN(b)) {
    // return next(`b of '${req.params.b}' is not a number`);
    throw new Error(`b of '${req.params.b}' is not a number`);
  }*/

  res.end(`${req.a + req.b}`);
});

app.get('/subtract/:a/:b', (req, res, next) => {
  /*const a = Number(req.params.a);
  const b = Number(req.params.b);

  if (isNaN(a)) {
    return next(`a of '${req.params.a}' is not a number`);
    //throw new Error(`a of '${req.params.a}' is not a number`);
  }

  if (isNaN(b)) {
    // return next(`b of '${req.params.b}' is not a number`);
    throw new Error(`b of '${req.params.b}' is not a number`);
  }*/

  res.end(`${req.a - req.b}`);
});

app.get('/:operator/:a/:b', (req, res, next) => {
  let answer = 0;
  switch(req.params.operator) {
    case '+':
      answer = req.a + req.b;
      break;
    case '-':
      answer = req.a - req.b;
      break;
    case '*':
      answer = req.a * req.b;
      break;
    case '/':
      answer = req.a / req.b;
      break;
    case '%':
      answer = req.a % req.b;
      break;
    case '**':
      answer = req.a ** req.b;
      break;
  }
  res.end(`${answer}`);
});


app.use((req, res, next) => {
  const error = new Error('404 - page not found');
  error.statusCode = 404;
  throw error;
});

app.use((error, req, res, next) => {
  res.statusCode = error.statusCode || 500;
  res.end(`OOPS - ${error}`);
});

app.listen(80);
