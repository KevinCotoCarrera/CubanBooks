const AdminBro = require('admin-bro')
const AdminBroExpress = require('@admin-bro/express')
const AdminBroMongoose = require('@admin-bro/mongoose')
var createError = require('http-errors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')
var indexRouter = require('./routes/index');
var catalogRouter = require('./routes/catalog');
var Book = require('./models/book');
var Author = require('./models/author');
var Genre = require('./models/genre');
var BookInstance = require('./models/bookinstance')
const express = require('express')
const app = express()
 
const mongoose = require('mongoose')

AdminBro.registerAdapter(AdminBroMongoose)
 
const run = async () => {
  const connection = await mongoose.connect('mongodb://localhost:27017/local_library', {useNewUrlParser: true, useUnifiedTopology: true})
 
 
  const adminBro = new AdminBro ({
    Databases: [connection],
    rootPath: '/admin',
    resources: [Book, Author, Genre, BookInstance]
  })
  const router = AdminBroExpress.buildRouter(adminBro)
  app.use(adminBro.options.rootPath, router)
  app.use(cors())
  app.use('/', indexRouter);
  app.use('/catalog', catalogRouter)
  app.use(function(req, res, next) {
    next(createError(404));
  });
  app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    // render the error page
    res.status(err.status || 500);
    res.render('error');
  });  
  app.use(logger('dev'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(express.static(path.join(__dirname, 'public')));
  app.set('views', path.join(__dirname, 'views')); 
  app.set('view engine', 'pug');

  
}
 
run()

module.exports = app;
