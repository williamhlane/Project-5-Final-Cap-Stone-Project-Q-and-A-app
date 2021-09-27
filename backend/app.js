var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var cors = require('cors');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var app = express();
app.use(cors({
    origin : [ 'http://localhost:3000' , 'http://localhost:3000/', 'http://127.0.0.1:3000', 'http://127.0.0.1:3000/' ],
    methods:["GET" , "POST" , "PUT", "DELETE"],
    credentials: true
  }));
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: "bla",
    cookie: {
      maxAge: 43200000,
    }
}));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;
