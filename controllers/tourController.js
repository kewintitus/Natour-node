const fs = require('fs');
const Tour = require('./../models/tourModel');

// const tours = JSON.parse(
//   fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
// );

// exports.checkName = (req, res, next) => {
//   console.log(req.body);
//   if (!req.body.name || !req.body.price) {
//     return res
//       .status(404)
//       .json({ status: 'fail', message: ' request body not defined' });
//   }
//   next();
// };

exports.getAllTours = async (req, res) => {
  try {
    const tours = await Tour.find();
    res.status(200).json({
      status: 'success',
      // requestedAt: req.requestTime,
      results: tours.length,
      data: {
        tours,
      },
    });
  } catch (error) {
    res.status(404).json({ status: 'failed', message: error });
  }
};

exports.getTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);

    res.status(200).json({
      status: 'success',
      data: tour,
    });
  } catch (error) {
    res.status(404).json({ status: 'fail', message: error });
  }
};

exports.createTour = async (req, res) => {
  try {
    const newTour = await Tour.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour,
      },
    });
  } catch (error) {
    res.status(400).json({ status: 'failed', message: error });
  }
};

exports.updateTour = (req, res) => {
  //   if (req.params.id * 1 > tours.length) {
  //     // if (!tour) {
  //     return res.status(404).json({ status: 'fail', message: 'invalid id' });
  //   }

  res.status(200).json({
    status: 'success',
    data: {
      tour: '<Updated tour here...></Updated>',
    },
  });
};

exports.deleteTour = (req, res) => {
  //   if (req.params.id * 1 > tours.length) {
  //     // if (!tour) {
  //     return res.status(404).json({ status: 'fail', message: 'invalid id' });
  //   }

  res.status(204).json({
    status: 'success',
    data: null,
  });
};

//LEGACY CODE
// exports.createTour = (req, res) => {
// console.log(req.body);
// const newId = tours[tours.length - 1].id + 1;
// const newTour = Object.assign({ id: newId }, req.body);
// tours.push(newTour);
// fs.writeFile(
//   `${__dirname}/dev-data/data/tours-simple.json`,
//   JSON.stringify(tours),
//   (err) => {
//     res.status(201).json({
//       status: 'success',
//       data: {
//         tour: newTour,
//       },
//     });
//   }
// );

/////////////Get tour
// console.log(req.params);

// const id = req.params.id * 1;

// // const tour = tours.find((el) => el.id === id);

// // if (id > tours.length) {
// //   if (!tour) {
// //     return res.status(404).json({ status: 'fail', message: 'invalid id' });
// //   }

// res.status(200).json({
//   // status: 'success',
//   // data: {
//   //   tour,
//   // },
// });
