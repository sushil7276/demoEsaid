const { param } = require("../app");
const catchAsyncError = require("../middleware/catchAsyncError");
const ErrorHandler = require("../middleware/errorHande");
const User = require("../models/useModel");
const { use } = require("../routes/userRoute");

// Register user
exports.registerUser = catchAsyncError(async (req, res) => {
  const { name, email, password } = req.body;

  const user = await User.create({
    name,
    email,
    password,
  });
  res.status(201).json({
    success: true,
    user,
  });
});

// Login User
exports.loginUser = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorHandler("Please Enter Email & Password", 401));
  }

  let user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorHandler("Invalid Email or password", 401));
  }

  const isPassword = user.password === password;
  if (!isPassword) {
    return next(new ErrorHandler("Invalid Email or password", 401));
  }

  res.status(200).json({
    success: true,
    user,
  });
});

// Logout user
exports.logout = catchAsyncError(async (req, res) => {
  res.status(200).json({
    success: true,
    message: "Logged Out",
  });
});

// Get all User ---> Admin
exports.getAllUser = catchAsyncError(async (req, res) => {
  const users = await User.find();
  res.status(200).json({
    success: true,
    users,
  });
});

// Get single User ---> Admin
exports.getSingleUser = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(
      new ErrorHandler(`User does not exist with id ${req.params.id}`)
    );
  }

  res.status(200).json({
    success: true,
    user,
  });
});

// Delete user
exports.deleteUser = catchAsyncError(async (req, res, next) => {
  const user = await User.findByIdAndDelete(req.param.id);

  if (!user) {
    return next(
      new ErrorHandler(`User does not exist with id ${req.params.id}`)
    );
  }

  res.status(200).json({
    success: true,
    message: "Deleted Successfully",
  });
});

// Update User Profile
exports.updateUser = catchAsyncError(async (req, res, next) => {
  let newUser = {
    name: req.body.name,
    email: req.body.email,
  };

  const user = await User.findByIdAndUpdate(req.user.id, newUser, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
  });
});

// Update User Password
exports.updatePassword = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  const isPasswordMatch = req.body.oldPassword === user.password;

  if (!isPasswordMatch) {
    return next(new ErrorHandler("Old Password is incorrect", 400));
  }

  if (req.body.newPassword !== req.body.confirmPassword) {
    return next(new ErrorHandler("Password does not match", 400));
  }

  user.password = req.body.newPassword;

  await user.save();

  res.status(200).json({
    success: true,
    user,
  });
});
