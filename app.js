const express = require('express');
const morgan = require('morgan');
const path = require('path');

const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
const reviewRouter = require('./routes/reviewRoutes');

const app = express();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

//1. Global Middlewares

//Serving for static files
app.use(express.static(path.join(__dirname, 'public')));

//Set security headers
app.use(helmet());

console.log(process.env.NODE_ENV);

//dev logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

//Limit requests from same api
const limiter = rateLimit({
  max: 100,
  windowMS: 60 * 60 * 1000,
  message: 'Too many requests, please try in an hour!',
});
app.use('/api', limiter);

//Body parser, reading data from body
app.use(express.json({ limit: '10kb' }));

//Data sanitization against no-sql query injection
app.use(mongoSanitize());

//Data sanitization against XSS
app.use(xss());

//Prevent parameter pollution
app.use(
  hpp({
    whitelist: [
      'duration',
      'ratingsQuantity',
      'ratingsAverage',
      'maxGroupSize',
      'difficulty',
      'price',
    ],
  })
);

//Test middleware
app.use((req, res, next) => {
  // console.log(req.headers);
  next();
});

//ROUTES
app.get('/', (req, res) => {
  res.status(200).render('base', {
    tour: 'The Forest Hiker',
    user: 'Jonas',
  });
});

app.get('/overview', (req, res) => {
  res.status(200).render('overview', {
    title: 'All Tours',
  });
});
app.get('/tour', (req, res) => {
  res.status(200).render('tour', {
    title: 'The Forest Hiker',
  });
});

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/reviews', reviewRouter);

app.all('*', (req, res, next) => {
  // res.status(404).json({
  //   status: 'FAIL',
  //   message: `Can't find ${req.originalUrl} on this server`,
  // });
  // const error = new Error(`Can't find ${req.originalUrl} on this server`);
  // error.status = 'fail';
  // error.statusCode = 404;

  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);

// app.use((req, res, next) => {
//   console.log('Hello from middleware!!!');
//   next();
// });

// app.use((req, res, next) => {
//   req.requestTime = new Date().toISOString();
//   next();
// });

// app.get('/api/v1/tours', getAllTours);
// URL Query parameter
// app.get('/api/v1/tours/:id', getTour);
// app.post('/api/v1/tours', createTour);
// app.patch('/api/v1/tours/:id', updateTour);
// app.delete('/api/v1/tours/:id', deleteTour);
module.exports = app;
