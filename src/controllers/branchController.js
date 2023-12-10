import asyncHandler from 'express-async-handler';
import SuccessResponse from '../utils/successResponse.js';
import BranchModel from '../models/branchModel.js';
import { branchSchema } from '../schemas/branch-schema.js';

// @desc    Sign in user
// @route   POST /api/v1/auth/sign-in
// @access  Public
export const createBranch = asyncHandler(async (req, res, _next) => {
  await branchSchema.validate(req.body);
  await BranchModel.create(req.body);

  return res.send(new SuccessResponse(
    null,
    'ae',
  ));
});
