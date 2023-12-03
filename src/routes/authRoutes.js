import express from 'express';
import multer from 'multer';
import fs from 'fs';
import colors from 'colors';
import {
  getAuthedUser, refreshToken, signIn, updateAvatar, updateDetails, updatePassword,
} from '../controllers/authControllers.js';
import checkToken from '../middlewares/checkToken.js';
import ErrorResponse from '../utils/errorResponse.js';

// const multerStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     const dest = 'src/uploads/avatars';
//     fs.access(dest, (error) => {
//       if (error) {
//         console.log(colors.bold.red('Avatar images directory does not exist.'));
//         fs.mkdirSync(dest, { recursive: true });
//       }
//       console.log(colors.bold.cyan('Avatar images directory exists.'));
//       return cb(null, dest);
//     });
//   },
//   filename: (req, file, cb) => {
//     const ext = file.mimetype.split('/')[1];
//     cb(null, `${req.userId}.${ext}`);
//   },
// });

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new ErrorResponse(400, 'Not an image! Please upload an image.'), false);
  }
};

const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter: multerFilter,
});

const authRoutes = express.Router();

authRoutes.post('/sign-in', signIn);
authRoutes.get('/user', checkToken, getAuthedUser);
authRoutes.post('/refresh-token', refreshToken);
authRoutes.post('/update-password', checkToken, updatePassword);
authRoutes.post('/update-details', checkToken, updateDetails);
authRoutes.post('/update-avatar', checkToken, upload.single('avatar'), updateAvatar);

export default authRoutes;
