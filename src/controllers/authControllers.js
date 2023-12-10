import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import fs from 'fs';
import path from 'path';
import ErrorResponse from '../utils/errorResponse.js';
import UserModel from '../models/userModel.js';
import { errors, success } from '../utils/responseMessages.js';
import SuccessResponse from '../utils/successResponse.js';
import { updateDetailsSchema, updatePasswordSchema } from '../schemas/auth-schema.js';

// @desc    Sign in user
// @route   POST /api/v1/auth/sign-in
// @access  Public
export const signIn = asyncHandler(async (req, res, next) => {
  if (!req.body?.password || !req.body?.email) {
    return next(new ErrorResponse(401, errors.user.unauthorized, errors.user.unauthorized));
  }

  const user = await UserModel.findOne({ email: req.body.email }).select('+password');
  if (!user) {
    return next(new ErrorResponse(404, errors.user.notFound, errors.user.notFound));
  }

  const isPasswordValid = await user.validatePassword(req.body.password);
  if (!isPasswordValid) {
    return next(new ErrorResponse(400, errors.user.invalidCredentials, errors.user.invalidCredentials));
  }

  const tokens = user.generateTokens();

  return res.send(new SuccessResponse(
    { userId: user.id, tokens },
    success.user.signIn,
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
    return next(new ErrorResponse(401, errors.user.unauthorized, errors.user.unauthorized));
  }
  try {
    const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_KEY);
    const { userId } = decoded;
    const user = await UserModel.findById(userId);
    if (!user) {
      return next(new ErrorResponse(401, errors.user.unauthorized, errors.user.unauthorized));
    }
    const { accessToken } = user.generateTokens();
    return res.send(new SuccessResponse(
      { accessToken },
      null,
    ));
  } catch (err) {
    return next(new ErrorResponse(401, errors.user.unauthorized, errors.user.unauthorized));
  }
};

// @desc    Update password
// @route   POST /api/v1/auth/update-password
// @access  Private
export const updatePassword = asyncHandler(async (req, res, next) => {
  const { authedUser } = req;

  await updatePasswordSchema.validate(req.body, { abortEarly: false });

  const user = await UserModel.findById(authedUser._id).select('+password');
  if (!user) {
    return next(new ErrorResponse(401, errors.user.notFound, errors.user.notFound));
  }

  const isPasswordValid = await user.validatePassword(req.body.currentPassword);
  if (!isPasswordValid) {
    return next(new ErrorResponse(400, errors.common.invalidParams, errors.common.invalidParams));
  }

  await UserModel.findOneAndUpdate({ _id: req.userId }, { password: req.body.newPassword });

  return res.send(new SuccessResponse(
    null,
    success.user.passwordUpdate,
  ));
});

// @desc    Update user details
// @route   POST /api/v1/auth/update-details
// @access  Private
export const updateDetails = asyncHandler(async (req, res, next) => {
  await updateDetailsSchema.validate(req.body, { abortEarly: false });

  const user = await UserModel.findByIdAndUpdate(req.authedUser._id, { ...req.body }, { new: true, runValidators: true });
  if (!user) {
    return next(new ErrorResponse(401, errors.userNotFound, errors.userNotFound));
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

  await UserModel.findByIdAndUpdate(req.authedUser.id, { avatar: req.file.filename });

  // toFile() method stores the image on disk
  return res.send(new SuccessResponse(
    null,
    success.common.dataUpdated,
  ));
});
