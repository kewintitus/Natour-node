const Tour = require('../models/tourModel');
const Review = require('../models/reviewModel');
const catchAsync = require('../utils/catchAsync');
const { isValidObjectId } = require('mongoose');

exports.getOverview = catchAsync(async (req, res, next) => {
  //1) Get tour data from collection
  const tours = await Tour.find();

  //2) Build template
  //3) Render tour

  res.status(200).render('overview', {
    title: 'All Tours',
    tours,
  });
});

exports.getTour = catchAsync(async (req, res, next) => {
  const tour = await Tour.findOne({ slug: req.params.slug }).populate({
    path: 'reviews',
    fields: 'review rating user',
  });
  console.log(tour);

  // const reviews = await Review.find();
  // console.log(reviews);

  res.status(200).render('tour', {
    title: `${tour.name}`,
    tour,
  });
});

exports.getLoginForm = catchAsync(async (req, res) => {
  res.status(200).render('login', { title: `Log into your account` });
});
