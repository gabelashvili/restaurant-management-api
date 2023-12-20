import asyncHandler from 'express-async-handler';
import EmployeeModel from '../models/employeeModel.js';
import { success } from '../utils/responseMessages.js';
import SuccessResponse from '../utils/successResponse.js';
import { upsertEmployeeSchema } from '../schemas/employee-schema.js';

// @desc    Add New Employee
// @route   POST /api/v1/employee
// @access  Private
export const createEmployee = asyncHandler(async (req, res) => {
  await upsertEmployeeSchema.validate(req.body, { abortEarly: false });

  await EmployeeModel.create({ ...req.body }, { new: true, runValidators: true });

  return res.send(new SuccessResponse(
    null,
    success.employee.created,
  ));
});
