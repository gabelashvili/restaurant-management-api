import asyncHandler from 'express-async-handler';
import SuccessResponse from '../utils/successResponse.js';
import BranchModel from '../models/branchModel.js';
import { branchSchema } from '../schemas/branch-schema.js';
import { errors, success } from '../utils/responseMessages.js';
import ErrorResponse from '../utils/errorResponse.js';
import withFilters from '../utils/withFilters.js';
import filtersSchema from '../schemas/filters-schema.js';

// @desc    Create new branch
// @route   POST /api/v1/branch
// @access  Private, role-based
export const createBranch = asyncHandler(async (req, res, _next) => {
  await branchSchema.validate(req.body, { abortEarly: false });

  const branch = await BranchModel.create(req.body);

  return res.send(new SuccessResponse(
    branch,
    success.branch.created,
  ));
});

// @desc    Update branch details
// @route   PUT /api/v1/branch/:branchId
// @access  Private, role-based
export const updateBranch = asyncHandler(async (req, res, next) => {
  await branchSchema.validate(req.body, { abortEarly: false });

  const branch = await BranchModel.findByIdAndUpdate(req.params.branchId, req.body, { new: true, runValidators: true });
  if (!branch) {
    return next(new ErrorResponse(404, errors.branch.notFound));
  }

  return res.send(new SuccessResponse(
    branch,
    success.branch.updated,
  ));
});

// @desc    Get branch details
// @route   GET /api/v1/branch/:branchId
// @access  Private, role-based
export const getBranch = asyncHandler(async (req, res, next) => {
  const branch = await BranchModel.findById(req.params.branchId);
  if (!branch) {
    return next(new ErrorResponse(404, errors.branch.notFound));
  }

  return res.send(new SuccessResponse(branch));
});

// @desc    Get all branches
// @route   GET /api/v1/branches
// @access  Private, role-based
export const getBranches = asyncHandler(async (req, res, _next) => {
  const filters = {
    ...req.query.limit && req.query.page && {
      pagination: {
        limit: Number(req.query.limit),
        page: Number(req.query.page),
      },
    },
    select: 'general',
    ...req.query.search && {
      search: {
        text: req.query.search,
        fields: ['general.name.ka', 'general.name.en'],
      },
    },
  };

  await filtersSchema.validate(filters);

  const data = await withFilters(BranchModel, filters);
  data.list = data.list.reduce((acc, cur) => [...acc, { ...cur.general, _id: cur._id }], []);

  return res.send(new SuccessResponse(data));
});

// @desc    Remove branch details
// @route   DELETE /api/v1/branch/:branchId
// @access  Private, role-based
export const removeBranch = asyncHandler(async (req, res, next) => {
  const branch = await BranchModel.findByIdAndDelete(req.params.branchId);

  if (!branch) {
    return next(new ErrorResponse(404, errors.branch.notFound));
  }

  return res.send(new SuccessResponse(null, success.branch.removed));
});
