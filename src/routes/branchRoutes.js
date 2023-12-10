import express from 'express';
import { createBranch } from '../controllers/branchController.js';

const branchRoutes = express.Router();

branchRoutes.post('/', createBranch);

export default branchRoutes;
