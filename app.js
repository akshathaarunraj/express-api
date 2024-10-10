// used for error handling -- including 404 and 500 errors
const createError = require('http-errors');
// official express package
const express = require('express');
// path package from nodejs 
const path = require('path');
// package for cookie parsing 
const cookieParser = require('cookie-parser');
// package for logging
const logger = require('morgan');
// importing official passport
const passport = require('passport');
const cors = require("cors");

require("./config/passport.config");

// custom imports
const indexRouter = require('./routes/index');
const employeesRouter = require("./routes/api/v1/employees");
const authRouter = require("./routes/api/v1/auth");
const moviesRouter = require("./routes/api/v1/movies");

const app = express();

// view engine setup -- template engine configured
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
// body parser middleware is setup to parse json and url encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// cookie parser middleware is setup to parse cookies
app.use(cookieParser());
// static files are served from the public folder. example files are images, css, js, fonts
app.use(express.static(path.join(__dirname, 'public')));

// setting up auth middleware
passport.initialize();

var corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions)); // enabling cors for "http://localhost:3000" only

// routes a.k.a urls / api endpoints are defined here
app.use('/', indexRouter); // localhost:3001/

// Configuring REST API Endpoints
app.use("/api/v1/employees", employeesRouter);
app.use("/api/v1/auth", authRouter);

// the following one used postgresql
app.use("/api/v1/movies", moviesRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// // error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  // you can send json -- do not render template
  res.json({
    message: err.message
  })
  // res.render('error');
});

module.exports = app;
