import express from 'express';
import checkToken from '../middlewares/checkToken.js';
import { createEmployee, getEmployees, getRoles } from '../controllers/employeeControllers.js';

const employeeRoutes = express.Router();

employeeRoutes
  .get('/', checkToken, getEmployees)
  .post('/', checkToken, createEmployee)
  .get('/roles', checkToken, getRoles);

export default employeeRoutes;
