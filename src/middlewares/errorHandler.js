import multer from 'multer';
import mongoose from 'mongoose';
import ErrorResponse from '../utils/errorResponse.js';
import { errors } from '../utils/responseMessages.js';

const errorHandler = (err, _req, res, _next) => {
  let errorResponse = {
    statusCode: err?.statusCode || 500,
    desc: null,
    message: err.message || 'Server Error',
  };

  // Mongoose
  if (err instanceof mongoose.Error.CastError) {
    errorResponse = new ErrorResponse(
      400,
      err.message,
      errors.common.invalidParams,
    );
  }
  if (err instanceof mongoose.Error.ValidationError) {
    errorResponse = new ErrorResponse(
      400,
      Object.keys(err.errors).map((key) => err.errors[key].message).join(';'),
      errors.common.invalidParams,
    );
  }

  if (err.code === 11000) {
    errorResponse = new ErrorResponse(
      400,
      `${err.codeName} - ${JSON.stringify(err.keyValue)}`,
      errors.common.invalidParams,
    );
  }

  // Joi errors
  console.log(err);

  // Multer errors
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      errorResponse = new ErrorResponse(
        400,
        errors.fileUpload.fileTooLarge,
      );
    } else if (err.code === 'INVALID_FILE_FORMAT') {
      errorResponse = new ErrorResponse(
        400,
        errors.fileUpload.invalidFileFormat,
      );
    } else {
      errorResponse = new ErrorResponse(
        400,
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
