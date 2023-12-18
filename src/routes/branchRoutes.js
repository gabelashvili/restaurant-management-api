import express from 'express';
import {
  createBranch, getBranch, getBranches, removeBranch, updateBranch,
} from '../controllers/branchController.js';

const branchRoutes = express.Router();

branchRoutes.post('/', createBranch).put('/:branchId', updateBranch).get('/', getBranches).get('/:branchId', getBranch)
  .delete('/:branchId', removeBranch);

export default branchRoutes;
