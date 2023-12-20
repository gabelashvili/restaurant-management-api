import asyncHandler from 'express-async-handler';
import ErrorResponse from '../utils/errorResponse.js';
import EmployeeModel from '../models/employeeModel.js';
import { errors, success } from '../utils/responseMessages.js';
import SuccessResponse from '../utils/successResponse.js';
import { updateDetailsSchema } from '../schemas/auth-schema.js';

// @desc    Add New Employee
// @route   POST /api/v1/employee
// @access  Private
export const updateDetails = asyncHandler(async (req, res, next) => {
  await updateDetailsSchema.validate(req.body, { abortEarly: false });

  const user = await EmployeeModel.findByIdAndUpdate(req.authedUser._id, { ...req.body }, { new: true, runValidators: true });
  if (!user) {
    return next(new ErrorResponse(401, errors.userNotFound, errors.userNotFound));
  }

  return res.send(new SuccessResponse(
    null,
    success.common.dataUpdated,
  ));
});
