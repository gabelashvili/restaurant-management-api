import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: 'gabelashvili1999@gmail.com',
    pass: 'xchw ztli nkfk pikh',
  },
});

export default transporter;
