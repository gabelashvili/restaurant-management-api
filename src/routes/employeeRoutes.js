import express from 'express';
import checkToken from '../middlewares/checkToken.js';
import {
  createEmployee, getEmployees, getRoles, updateEmployee,
} from '../controllers/employeeControllers.js';

const employeeRoutes = express.Router();

employeeRoutes
  .get('/', checkToken, getEmployees)
  .post('/', checkToken, createEmployee)
  .put('/:employeeId', checkToken, updateEmployee)
  .get('/roles', checkToken, getRoles);

export default employeeRoutes;
