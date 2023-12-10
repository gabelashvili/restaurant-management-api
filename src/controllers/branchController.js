import asyncHandler from 'express-async-handler';
import SuccessResponse from '../utils/successResponse.js';
import BranchModel from '../models/branchModel.js';

// @desc    Sign in user
// @route   POST /api/v1/auth/sign-in
// @access  Public
export const createBranch = asyncHandler(async (req, res, next) => {
  await BranchModel.create(req.body);

  return res.send(new SuccessResponse(
    null,
    'ae',
  ));
});
