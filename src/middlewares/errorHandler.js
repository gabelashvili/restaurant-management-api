import ErrorResponse from '../utils/errorResponse.js';
import responseMessages from '../utils/responseMessages.js';

const errorHandler = (err, _req, res, _next) => {
  let errorResponse = {
    statusCode: err?.statusCode || 500,
    message: err.message || 'Server Error',
  };

  if (err.name === 'ValidationError') {
    errorResponse = new ErrorResponse(
      400,
      responseMessages.error[err?.details?.[0]?.type === 'object.unknown' ? 'tooManyArguments' : 'invalidParams'],
    );
  }

  res.status(errorResponse.statusCode).send({
    data: null,
    success: false,
    message: errorResponse.message,
  });
};

export default errorHandler;
