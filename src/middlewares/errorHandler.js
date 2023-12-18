import multer from 'multer';
import mongoose from 'mongoose';
import { ValidationError as YupError } from 'yup';
import ErrorResponse from '../utils/errorResponse.js';
import { errors } from '../utils/responseMessages.js';

const errorHandler = (err, _req, res, _next) => {
  let errorResponse = {
    statusCode: err?.statusCode || 500,
    desc: err.desc || null,
    message: err.message || 'Server Error',
  };
  // Mongoose
  if (err instanceof mongoose.Error.CastError) {
    errorResponse = new ErrorResponse(
      400,
      errors.common.invalidParams,
      err.message,
    );
  }
  if (err instanceof mongoose.Error.ValidationError) {
    errorResponse = new ErrorResponse(
      400,
      errors.common.invalidParams,
      Object.keys(err.errors).map((key) => err.errors[key].message).join(';'),
    );
  }

  if (err.code === 11000) {
    errorResponse = new ErrorResponse(
      400,
      errors.common.invalidParams,
      `${err.codeName} - ${JSON.stringify(err.keyValue)}`,
    );
  }

  // Joi errors
  if (err instanceof YupError) {
    errorResponse = new ErrorResponse(
      400,
      errors.common.invalidParams,
      err.errors.map((el) => el).join(';'),
    );
  }

  // Multer errors
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      errorResponse = new ErrorResponse(
        400,
        errors.common.invalidParams,
        errors.fileUpload.fileTooLarge,
      );
    } else if (err.code === 'INVALID_FILE_FORMAT') {
      errorResponse = new ErrorResponse(
        400,
        errors.common.invalidParams,
        errors.fileUpload.invalidFileFormat,
      );
    } else {
      errorResponse = new ErrorResponse(
        400,
        'unknown',
        errors.common.invalidParams,
      );
    }
  }

  res.status(errorResponse.statusCode).send({
    data: null,
    success: false,
    desc: errorResponse.desc,
    message: errorResponse.message,
  });
};

export default errorHandler;
