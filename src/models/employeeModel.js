import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import RoleModel from './roleModel.js';

const EmployeeSchema = new mongoose.Schema(
  {
    firstName: {
      ka: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
      },
      en: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
      },
    },
    lastName: {
      ka: {
        type: String,
        required: true,
        trim: true,
      },
      en: {
        type: String,
        required: true,
        trim: true,
      },
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      // eslint-disable-next-line max-len
      match: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    },
    password: {
      type: String,
      required: true,
      select: false,
      minlength: 8,
    },
    roleId: {
      type: Number,
      required: true,
    },
    avatar: {
      type: String,
      default: null,
    },
    phone: {
      type: String,
      required: true,
    },
    updatedAt: { type: Date, select: false },
  },
  {
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: {
      virtuals: true,
      versionKey: false,
      transform: (doc, ret) => {
        delete ret.roleId;
      },
    },
  },
);

EmployeeSchema.virtual('role', {
  ref: RoleModel,
  localField: 'roleId',
  foreignField: 'roleId',
  justOne: true,
  options: {
    select: 'roleName roleLabel',
  },
});

EmployeeSchema.pre('save', async function (next) {
  if (this.password) {
    const salt = await bcrypt.genSalt(Number(process.env.BCRYPT_SALT_ROUNDS));
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
  }
  next();
});

EmployeeSchema.pre('findOneAndUpdate', async function (next) {
  if (this._update.password) {
    const salt = await bcrypt.genSalt(Number(process.env.BCRYPT_SALT_ROUNDS));
    const hashedPassword = await bcrypt.hash(this._update.password, salt);
    this._update.password = hashedPassword;
  }
  next();
});

EmployeeSchema.methods.validatePassword = async function (password) {
  const isValid = await bcrypt.compare(password, this.password);
  return isValid;
};

EmployeeSchema.methods.generateTokens = function generateTokens() {
  const accessToken = jwt.sign(
    { userId: this._id },
    process.env.ACCESS_TOKEN_KEY,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRE_IN,
    },
  );
  const refreshToken = jwt.sign(
    { userId: this._id },
    process.env.REFRESH_TOKEN_KEY,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRE_IN,
    },
  );
  return { accessToken, refreshToken };
};

const EmployeeModel = mongoose.model('Employee', EmployeeSchema);

export default EmployeeModel;
