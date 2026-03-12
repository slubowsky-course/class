import express from 'express';
import path from 'path';
import createError from 'http-errors';
import { MongoClient } from 'mongodb';

const app = express();

const __dirname = import.meta.dirname;
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hjs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));

app.use(async (req, res, next) => {
  const uri = 'mongodb://localhost:27017';
  const client = new MongoClient(uri);

  try {
    const db = await client.db('blog');
    // const posts = await db.collection('posts').find().toArray();
    // console.log(posts);

    req.posts = await db.collection('posts');

    next();
  } catch (e) {
    next(e);
  }
});

app.get('/', async (req, res, next) => {
  try {
    const posts = await req.posts.find()/*.sort({date: 1}).skip(2).limit(2)*/.toArray();

    res.render('layout', {
      posts,
      partials: {
        content: 'index'
      }
    });
  } catch (e) {
    next(e);
  }
});

app.post('/', async (req, res, next) => {
  try {
    req.body.date = new Date();
    req.body.author = 'Donald'; // get from login
    await req.posts.insertOne(req.body);

    res.redirect('/');
  } catch (e) {
    next(e);
  }
});

app.get('/addPost', (req, res, next) => {
  res.render('layout', {
    partials: {
      content: 'addPost'
    }
  });
});

// close client?
/*app.use((req, res, next) => {

});*/

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

app.locals.title = 'PCS MongoDB Blog';

app.listen(80);
