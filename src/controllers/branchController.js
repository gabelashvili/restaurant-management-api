import asyncHandler from 'express-async-handler';
import SuccessResponse from '../utils/successResponse.js';
import BranchModel from '../models/branchModel.js';
import { branchSchema } from '../schemas/branch-schema.js';
import { success } from '../utils/responseMessages.js';

// @desc    Sign in user
// @route   POST /api/v1/branch
// @access  Private, role-based
export const createBranch = asyncHandler(async (req, res, _next) => {
  await branchSchema.validate(req.body);

  const branch = await BranchModel.create(req.body);

  return res.send(new SuccessResponse(
    branch,
    success.branch.created,
  ));
});
