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

app.use((req, res, next)=>{
  res.locals.name = req.cookies.name ?? ' Please enter your name';
  next();
});

app.use('/', indexRouter);
app.use('/users', usersRouter);

// let viewCount = 0;
app.use('/viewCount', (req, res, next) => {
  let viewCount = req.signedCookies.viewCount ?? 0;
  viewCount++;

  res.cookie('viewCount', viewCount, {
    ///maxAge: 5000, // expires: new Date(...)
    //secure: true,
    //httpOnly: true,
    signed: true
  });

  res.send(`Hi! You have visited this page ${viewCount} times`);
});

app.get('/aboutUs', (req, res, next) => {
  res.render('layout', {
    title: 'About Us',
    // name: req.cookies.name ?? ' Please enter your name',
    partials: {content: 'aboutUs'}
  });
  next();
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
