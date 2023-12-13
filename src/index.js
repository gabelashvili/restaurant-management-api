import express from 'express';
import colors from 'colors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import cors from 'cors';
import fs from 'fs';
import { morganFormats } from './utils/helpers.js';
import connectDb from './utils/connectDb.js';
import authRoutes from './routes/authRoutes.js';
import errorHandler from './middlewares/errorHandler.js';
import ErrorResponse from './utils/errorResponse.js';
import { errors } from './utils/responseMessages.js';
import branchRoutes from './routes/branchRoutes.js';

// Load configs
dotenv.config({ path: 'src/config/config.env' });

// Format morgan
morgan.token('host', (req) => `${req.protocol}://${req.get('host')}${req.originalUrl}`);

// Connect to DB
connectDb().then(() => {
  const app = express();

  // Cors
  app.use(cors());

  // Log requests
  app.use(morgan(morganFormats));

  // Body parser
  app.use(express.json());

  // Get avatar
  app.get('/avatar/:avatarName', (req, res, next) => {
    const { avatarName } = req.params;
    const readStream = fs.createReadStream(`./src/uploads/avatars/${avatarName}`);
    readStream.on('error', () => next(new ErrorResponse(404, errors.fileUpload.fileNotFound)));
    readStream.pipe(res);
  });

  // routes
  app.use('/api/v1/auth', authRoutes);
  app.use('/api/v1/branches', branchRoutes);

  // Handle errors

  app.use(errorHandler);

  app.listen(process.env.PORT, async () => {
    console.log(colors.cyan.underline(`Server listening on port ${process.env.PORT}`));
  });
}).catch(() => {
  process.exit(1);
});
