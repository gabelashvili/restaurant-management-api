import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import fs from 'fs';
import path from 'path';
import ErrorResponse from '../utils/errorResponse.js';
import EmployeeModel from '../models/employeeModel.js';
import { errors, success } from '../utils/responseMessages.js';
import SuccessResponse from '../utils/successResponse.js';
import { updatePasswordSchema } from '../schemas/auth-schema.js';
import { upsertEmployeeSchema } from '../schemas/employee-schema.js';

// @desc    Sign in user
// @route   POST /api/v1/auth/sign-in
// @access  Public
export const signIn = asyncHandler(async (req, res, next) => {
  if (!req.body?.password || !req.body?.email) {
    return next(new ErrorResponse(401, errors.employee.unauthorized, errors.employee.unauthorized));
  }

  const user = await EmployeeModel.findOne({ email: req.body.email }).select('+password');
  if (!user) {
    return next(new ErrorResponse(404, errors.employee.notFound, errors.employee.notFound));
  }

  const isPasswordValid = await user.validatePassword(req.body.password);
  if (!isPasswordValid) {
    return next(new ErrorResponse(400, errors.employee.invalidCredentials, errors.employee.invalidCredentials));
  }

  const tokens = user.generateTokens();

  return res.send(new SuccessResponse(
    { userId: user.id, tokens },
    success.employee.signIn,
  ));
});

// @desc    Get authed user data
// @route   POST /api/v1/auth/user/:userId
// @access  Private
export const getAuthedUser = asyncHandler(async (req, res, _next) => {
  const { authedUser } = req;

  const user = await authedUser.populate('role');

  return res.send(new SuccessResponse(user, null));
});

// @desc    Refresh token
// @route   POST /api/v1/auth/refresh-token
// @access  Private
export const refreshToken = async (req, res, next) => {
  const token = req?.headers?.authorization?.split('Bearer')?.[1]?.trim();
  if (!token) {
    return next(new ErrorResponse(401, errors.employee.unauthorized, errors.employee.unauthorized));
  }
  try {
    const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_KEY);
    const { userId } = decoded;
    const user = await EmployeeModel.findById(userId);
    if (!user) {
      return next(new ErrorResponse(401, errors.employee.unauthorized, errors.employee.unauthorized));
    }
    const { accessToken } = user.generateTokens();
    return res.send(new SuccessResponse(
      { accessToken },
      null,
    ));
  } catch (err) {
    return next(new ErrorResponse(401, errors.employee.unauthorized, errors.employee.unauthorized));
  }
};

// @desc    Update password
// @route   POST /api/v1/auth/update-password
// @access  Private
export const updatePassword = asyncHandler(async (req, res, next) => {
  const { authedUser } = req;

  await updatePasswordSchema.validate(req.body, { abortEarly: false });

  const user = await EmployeeModel.findById(authedUser._id).select('+password');
  if (!user) {
    return next(new ErrorResponse(401, errors.employee.notFound, errors.employee.notFound));
  }

  const isPasswordValid = await user.validatePassword(req.body.currentPassword);
  if (!isPasswordValid) {
    return next(new ErrorResponse(400, errors.common.invalidParams, errors.common.invalidParams));
  }

  await EmployeeModel.findOneAndUpdate({ _id: authedUser._id }, { password: req.body.newPassword });

  return res.send(new SuccessResponse(
    null,
    success.employee.passwordUpdate,
  ));
});

// @desc    Update user details
// @route   POST /api/v1/auth/update-details
// @access  Private
export const updateDetails = asyncHandler(async (req, res, next) => {
  await upsertEmployeeSchema.validate(req.body, { abortEarly: false });

  const user = await EmployeeModel.findByIdAndUpdate(req.authedUser._id, { ...req.body }, { new: true, runValidators: true });
  if (!user) {
    return next(new ErrorResponse(401, errors.employeeNotFound, errors.employeeNotFound));
  }

  return res.send(new SuccessResponse(
    null,
    success.common.dataUpdated,
  ));
});

// @desc    Update user avatar
// @route   POST /api/v1/auth/update-avatar
// @access  Private
export const updateAvatar = asyncHandler(async (req, res, _next) => {
  if (req.authedUser.avatar && req.file.filename !== req.authedUser.avatar) {
    fs.unlink(path.join(req.file.destination, req.authedUser.avatar), () => {
    });
  }

  await EmployeeModel.findByIdAndUpdate(req.authedUser.id, { avatar: req.file.filename });

  // toFile() method stores the image on disk
  return res.send(new SuccessResponse(
    null,
    success.common.dataUpdated,
  ));
});
