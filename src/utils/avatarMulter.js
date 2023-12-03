import multer from 'multer';
import fs from 'fs';

const AVATAR_MAX_SIZE = 2 * 1024 * 1024;

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dest = 'src/uploads/avatars';
    fs.access(dest, (error) => {
      if (error) {
        fs.mkdirSync(dest, { recursive: true });
      }
      return cb(null, dest);
    });
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split('/')[1];
    cb(null, `${req.userId}.${ext}`);
  },
});

const multerFilter = (req, file, cb) => {
  if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
    cb(null, true);
  } else {
    cb(new multer.MulterError('INVALID_FILE_FORMAT', 'avatar'));
  }
};

const avatarUpload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
  limits: { fileSize: AVATAR_MAX_SIZE, file: 1 },
});

export default avatarUpload;
