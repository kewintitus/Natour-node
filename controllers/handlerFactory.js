const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.deleteOne = (Model) => {
  return catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);

    if (!doc) return next(new AppError('No document found with that Id', 404));

    res.status(204).json({
      status: 'success',
      data: null,
    });
  });
};

// exports.deleteTour = catchAsync(async (req, res, next) => {
//   const tour = await Tour.findByIdAndDelete(req.params.id);

//   if (!tour) {
//     return next(new AppError('No tour found with ID', 404));
//   }

//   res.status(204).json({
//     status: 'success',
//     message: 'deleted successfully',
//   });
// });
