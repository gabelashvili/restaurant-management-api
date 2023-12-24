import asyncHandler from 'express-async-handler';
import EmployeeModel from '../models/employeeModel.js';
import { success } from '../utils/responseMessages.js';
import SuccessResponse from '../utils/successResponse.js';
import { upsertEmployeeSchema } from '../schemas/employee-schema.js';
import transporter from '../utils/emailTransporter.js';
import RoleModel from '../models/roleModel.js';
import filtersSchema from '../schemas/filters-schema.js';
import withFilters from '../utils/withFilters.js';

// @desc    Add New Employee
// @route   POST /api/v1/employees
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

// @desc    Get employee roles list
// @route   POST /api/v1/employees/roles
// @access  Private, role-based
export const getRoles = asyncHandler(async (req, res) => {
  const roles = await RoleModel.find();

  return res.send(new SuccessResponse(
    roles,
    success.employee.created,
  ));
});

// @desc    Get all branches
// @route   GET /api/v1/employees
// @access  Private, role-based
export const getEmployees = asyncHandler(async (req, res, _next) => {
  const filters = {
    ...req.query.limit && req.query.page && {
      pagination: {
        limit: Number(req.query.limit),
        page: Number(req.query.page),
      },
    },
    ...req.query.search && {
      search: {
        text: req.query.search,
        fields: ['general.name.ka', 'general.name.en'],
      },
    },
    populate: 'role',
  };

  await filtersSchema.validate(filters);

  const data = await withFilters(EmployeeModel, filters);

  return res.send(new SuccessResponse(data));
});
