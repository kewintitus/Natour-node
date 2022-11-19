const User = require('./../models/userModel');

const catchAsync = require('./../utils/catchAsync');

exports.getUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'route not implemented',
  });
};
exports.updateUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'route not implemented',
  });
};
exports.deleteUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'route not implemented',
  });
};
exports.createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'route not implemented',
  });
};

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    status: 'success',
    // requestedAt: req.requestTime,
    results: users.length,
    data: {
      users,
    },
  });
});
