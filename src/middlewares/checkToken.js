import jwt from 'jsonwebtoken';
import ErrorResponse from '../utils/errorResponse.js';
import { errors } from '../utils/responseMessages.js';
import EmployeeModel from '../models/employeeModel.js';

const checkToken = async (req, res, next) => {
  const token = req?.headers?.authorization?.split('Bearer')[1]?.trim();
  if (!token) {
    return next(new ErrorResponse(401, errors.user.unauthorized, errors.user.unauthorized));
  }
  try {
    jwt.verify(token, process.env.ACCESS_TOKEN_KEY);
    const decoded = jwt.decode(token);
    if (decoded?.userId) {
      const user = await EmployeeModel.findById(decoded.userId);
      if (!user) {
        return next(new ErrorResponse(401, errors.user.unauthorized, errors.user.unauthorized));
      }
      req.authedUser = user;
    }
    return next();
  } catch (err) {
    return next(new ErrorResponse(401, errors.user.unauthorized, errors.user.unauthorized));
  }
};

export default checkToken;
