import asyncHandler from 'express-async-handler';
import EmployeeModel from '../models/employeeModel.js';
import { success } from '../utils/responseMessages.js';
import SuccessResponse from '../utils/successResponse.js';
import { upsertEmployeeSchema } from '../schemas/employee-schema.js';
import transporter from '../utils/emailTransporter.js';

// @desc    Add New Employee
// @route   POST /api/v1/employee
// @access  Private
export const createEmployee = asyncHandler(async (req, res) => {
  await upsertEmployeeSchema.validate(req.body, { abortEarly: false });

  const password = (Math.random() + 1).toString(36).substring(4);
  req.body.password = password;

  await EmployeeModel.create(req.body);

  await transporter.sendMail({
    from: 'gabelashvili1999@gmail.com',
    to: req.body.email,
    subject: 'Account registration', //
    html: `<div>password: <b>${password}</b></div>`,
  });

  return res.send(new SuccessResponse(
    null,
    success.employee.created,
  ));
});
