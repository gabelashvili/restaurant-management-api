import express from 'express';
import {
  createBranch, getBranch, getBranches, removeBranch, updateBranch,
} from '../controllers/branchController.js';
import checkToken from '../middlewares/checkToken.js';

const branchRoutes = express.Router();

branchRoutes
  .post('/', checkToken, createBranch)
  .put('/:branchId', checkToken, updateBranch)
  .get('/', checkToken, getBranches)
  .get('/:branchId', checkToken, getBranch)
  .delete('/:branchId', checkToken, removeBranch);

export default branchRoutes;
