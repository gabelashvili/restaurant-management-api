import express from 'express';
import checkToken from '../middlewares/checkToken.js';
import { createEmployee } from '../controllers/employeeControllers.js';

const employeeRoutes = express.Router();

employeeRoutes
  .post('/', checkToken, createEmployee);

export default employeeRoutes;
