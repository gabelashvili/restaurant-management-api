import express from 'express';
import {
  getAuthedUser, refreshToken, signIn, updateAvatar, updateDetails, updatePassword,
} from '../controllers/authControllers.js';
import checkToken from '../middlewares/checkToken.js';
import avatarUpload from '../utils/avatarMulter.js';

const authRoutes = express.Router();

authRoutes.post('/sign-in', signIn);
authRoutes.get('/user', checkToken, getAuthedUser);
authRoutes.post('/refresh-token', refreshToken);
authRoutes.post('/update-password', checkToken, updatePassword);
authRoutes.post('/update-details', checkToken, updateDetails);
authRoutes.post('/update-avatar', checkToken, avatarUpload.single('avatar'), updateAvatar);

export default authRoutes;
