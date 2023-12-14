import express from 'express';
import { createBranch, getBranch, updateBranch } from '../controllers/branchController.js';

const branchRoutes = express.Router();

branchRoutes.post('/', createBranch).put('/:branchId', updateBranch).get('/:branchId', getBranch);

export default branchRoutes;
