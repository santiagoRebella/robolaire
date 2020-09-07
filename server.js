const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const sassMiddleware = require('node-sass-middleware');

const indexRouter = require('./server/routes/index');
const poemsRouter = require('./server/routes/poems');

const server = express();

server.set('views', path.join(__dirname, 'server/views'));
server.set('view engine', 'ejs');

server.use(logger('dev'));
server.use(express.json());
server.use(express.urlencoded({ extended: false }));
server.use(cookieParser());
server.use(sassMiddleware({
  src: path.join(__dirname, 'styles'),
  dest: path.join(__dirname, 'public/stylesheets'),
  indentedSyntax: false,
  debug: true,
  outputStyle: 'compressed',
  prefix: '/stylesheets'
}));
server.use(express.static(path.join(__dirname, 'public')));

server.use('/', indexRouter);
server.use('/poems', poemsRouter)

server.use((req, res, next) => {
  next(createError(404));
});

server.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = server;
