import express from 'express';
import checkToken from '../middlewares/checkToken.js';
import {
  createProductCategory, getProductCategories, removeProductCategory, updateProductCategory,
} from '../controllers/productCategoryController.js';

const productCategoryRoutes = express.Router();

productCategoryRoutes
  .get('/', checkToken, getProductCategories)
  .post('/', checkToken, createProductCategory)
  .put('/:productCategoryId', checkToken, updateProductCategory)
  .delete('/:productCategoryId', checkToken, removeProductCategory);

export default productCategoryRoutes;
