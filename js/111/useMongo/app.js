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
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

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


const { MongoClient } = require('mongodb');
// Replace the uri string with your connection string.
//const uri = 'mongodb://localhost:27017';
const uri = 'mongodb+srv://<user>:<pwd>@cluster0.ahves.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const client = new MongoClient(uri);
async function run() {
  try {
    /*const database = client.db('one');
    const presidents = database.collection('presidents');

    const query = { name: 'Donald Trump' };

    const president = await presidents.findOne(query);
    console.log(president);*/

    const database = client.db('sample_airbnb');
    const listingsAndReviews = database.collection('listingsAndReviews');
    const listings = await listingsAndReviews.find({ name: 'Ribeira Charming Duplex' });
    // console.log(listings);
    console.log(await listings.count());
    //console.log('materializing');
    //const asArray = await listings.toArray();
    //console.log(asArray[0]);
    //await listings.forEach(l => console.log(l));
    /*for await (const listing of listings) {
      console.log(listing);
    }*/

    while (await listings.hasNext()) {
      console.log(await listings.next());
    }
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);
