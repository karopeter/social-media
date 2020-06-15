const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const userRoutes = require('./routes/user');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');

const app = express();

mongoose.connect('mongodb://localhost:27017/giphy-gram')
.then(() => {
  console.log('DB Connection Successful!');
}).catch(() => {
   console.log('Connection failed!');
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
  next();
});
app.use(cookieParser());

// 1) GLOBAL MIDDLEWARES

// Developing Logging
 if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
 }

 // Test middleware
 app.use((req, res, next) => {
   req.requestTime = new Date().toISOString();
   next();
 });

app.use('/api/v1/user', userRoutes);

app.all('*', (req, res, next) => {
   next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
