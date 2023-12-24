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

  const password = (Math.random() + 1).toString(36).substring(4);
  req.body.password = password;

  await EmployeeModel.create(req.body);

  return res.send(new SuccessResponse(
    null,
    success.employee.created,
  ));
});
