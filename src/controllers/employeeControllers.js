import asyncHandler from 'express-async-handler';
import EmployeeModel from '../models/employeeModel.js';
import { errors, success } from '../utils/responseMessages.js';
import SuccessResponse from '../utils/successResponse.js';
import { upsertEmployeeSchema } from '../schemas/employee-schema.js';
import transporter from '../utils/emailTransporter.js';
import RoleModel from '../models/roleModel.js';
import filtersSchema from '../schemas/filters-schema.js';
import withFilters from '../utils/withFilters.js';
import ErrorResponse from '../utils/errorResponse.js';

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

// @desc    Edit Employee
// @route   PUT /api/v1/employees
// @access  Private
export const updateEmployee = asyncHandler(async (req, res, next) => {
  await upsertEmployeeSchema.validate(req.body, { abortEarly: false });

  const employee = await EmployeeModel.findByIdAndUpdate(req.params.employeeId, req.body);

  if (!employee) {
    return next(new ErrorResponse(404, errors.employee.notFound));
  }

  return res.send(new SuccessResponse(
    null,
    success.employee.updated,
  ));
});

// @desc    Get employee roles list
// @route   POST /api/v1/employees/roles
// @access  Private, role-based
export const getRoles = asyncHandler(async (req, res) => {
  const roles = await RoleModel.find();

  return res.send(new SuccessResponse(
    roles,
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
        fields: ['firstName.ka', 'firstName.en', 'email', 'phone'],
      },
    },
    populate: 'role branches',
    ...(req.query.sortBy && req.query.sortBy) && {
      sort: {
        sortBy: req.query.sortBy,
        sortDir: req.query.sortDir,
      },
    },
    ...(req.query.roleId && { where: { roleId: req.query.roleId } }),
  };

  await filtersSchema.validate(filters);

  const data = await withFilters(EmployeeModel, filters);

  return res.send(new SuccessResponse(data));
});

// @desc    Remove branch details
// @route   DELETE /api/v1/employees/:employeeId
// @access  Private, role-based
export const removeEmployee = asyncHandler(async (req, res, next) => {
  const branch = await EmployeeModel.findById(req.params.employeeId).populate('branches');
  if (!branch) {
    return next(new ErrorResponse(404, errors.employee.notFound));
  }
  if (branch.branches.length > 0) {
    return next(new ErrorResponse(409, errors.employee.associatedBranch));
  }

  await branch.deleteOne();

  return res.send(new SuccessResponse(null, success.employee.removed));
});
