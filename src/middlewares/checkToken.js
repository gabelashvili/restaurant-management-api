import jwt from 'jsonwebtoken';
import ErrorResponse from '../utils/errorResponse.js';
import responseMessages from '../utils/responseMessages.js';

const checkToken = async (req, res, next) => {
  const token = req?.headers?.authorization?.split('Bearer')[1]?.trim();
  if (!token) {
    return next(new ErrorResponse(401, responseMessages.error.unauthorized));
  }
  try {
    jwt.verify(token, process.env.ACCESS_TOKEN_KEY);
    const decoded = jwt.decode(token);
    if (decoded?.userId) {
      req.userId = decoded.userId;
    }
    return next();
  } catch (err) {
    return next(new ErrorResponse(401, responseMessages.error.unauthorized));
  }
};

export default checkToken;
