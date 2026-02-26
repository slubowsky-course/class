var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

app.use(session({
  secret: 'foo',
  resave: false,
  saveUninitialized: false
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hjs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use((req, res, next) => {
  res.locals.userName = req.session.userName;// ?? 'nobody';
  res.locals.notLoggedIn = !res.locals.userName;
  next();
});

app.post('/login', require('./login'));
app.get('/logout', (req, res, next) => {
  req.session.destroy();
  res.redirect('/');
});
app.post('/signUp', require('./signUp'));

app.use('/', indexRouter);
app.use('/users', usersRouter);

/*app.use(*/ const loggedInOnly = (req, res, next) => {
  if (req.session.userName) {
    return next();
  }

  res.redirect('/');
};//);

app.get('/admin', loggedInOnly, (req, res, next) => {
  res.render('layout', { partials: { content: 'admin' } });
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
