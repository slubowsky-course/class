var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hjs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser('foo'));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  //const colors = req.cookies.colors ? JSON.parse(req.cookies.colors) : {};
  const colors = req.signedCookies.colors ? JSON.parse(req.signedCookies.colors) : {};
  colors.color = req.query.color ?? colors.color ?? '#000000';
  colors.backgroundColor = req.query.backgroundColor ?? colors.backgroundColor ?? '#FFFFFF';

  res.locals.color = colors.color;
  res.locals.backgroundColor = colors.backgroundColor;

  res.cookie('colors', JSON.stringify(colors), {
    httpOnly: true,
    secure: true,
    //expires: new Date('2026-02-20'),
    maxAge: 60000,
    signed: true
  });

  next();
});

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.get('/about', function (req, res, next) {
  res.render('layout', {
    title: 'Express', partials: {
      content: 'about'
    }
  });
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
