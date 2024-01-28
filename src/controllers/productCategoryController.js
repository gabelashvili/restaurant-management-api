import asyncHandler from 'express-async-handler';
import SuccessResponse from '../utils/successResponse.js';
import { errors, success } from '../utils/responseMessages.js';
import ProductCategoryModel from '../models/productCategoryModel.js';
import { upsertProductCategorySchema } from '../schemas/product-category-schema.js';
import filtersSchema from '../schemas/filters-schema.js';
import withFilters from '../utils/withFilters.js';
import ErrorResponse from '../utils/errorResponse.js';

// @desc    Get product categories
// @route   get /api/v1/product-categories
// @access  Private, role-based
export const getProductCategories = asyncHandler(async (req, res, _next) => {
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
        fields: ['name.ka', 'name.en'],
      },
    },
    ...(req.query.sortBy && req.query.sortBy) && {
      sort: {
        sortBy: req.query.sortBy,
        sortDir: req.query.sortDir,
      },
    },
  };
  await filtersSchema.validate(filters);

  const productCategories = await withFilters(ProductCategoryModel, filters);

  return res.send(new SuccessResponse(
    productCategories,
    null,
  ));
});

// @desc    Create new product category
// @route   POST /api/v1/product-categories
// @access  Private, role-based
export const createProductCategory = asyncHandler(async (req, res, _next) => {
  await upsertProductCategorySchema.validate(req.body);

  const branch = await ProductCategoryModel.create(req.body);

  return res.send(new SuccessResponse(
    branch,
    success.productCategory.created,
  ));
});

// @desc    Update product category
// @route   PUT /api/v1/product-categories
// @access  Private, role-based
export const updateProductCategory = asyncHandler(async (req, res, next) => {
  const { productCategoryId } = req.params;

  await upsertProductCategorySchema.validate(req.body);

  const productCategory = await ProductCategoryModel.findByIdAndUpdate(productCategoryId, req.body);
  if (!productCategory) {
    return next(new ErrorResponse(404, errors.productCategory.notFound));
  }

  return res.send(new SuccessResponse(
    productCategory,
    success.productCategory.created,
  ));
});

// @desc    Remove product category
// @route   DELETE /api/v1/product-categories
// @access  Private, role-based
export const removeProductCategory = asyncHandler(async (req, res, next) => {
  const { productCategoryId } = req.params;

  const productCategory = await ProductCategoryModel.findByIdAndDelete(productCategoryId);
  if (!productCategory) {
    return next(new ErrorResponse(404, errors.productCategory.notFound));
  }

  return res.send(new SuccessResponse(
    null,
    success.productCategory.removed,
  ));
});
