import dotenv from 'dotenv';
import mongoose from 'mongoose';
import colors from 'colors';
import RoleModel from '../models/roleModel.js';
import UserModel from '../models/userModel.js';

dotenv.config({ path: 'src/config/config.env' });

const roles = [
  {
    roleName: 'Admin',
    roleId: 1,
  },
  {
    roleName: 'Manager',
    roleId: 2,
  },
  {
    roleName: 'Employer',
    roleId: 3,
  },
];

const createRoles = async () => {
  await RoleModel.insertMany(roles);
};

const createAdminUser = async () => {
  const adminUser = {
    firstName: 'Admin',
    lastName: 'User',
    email: 'gabelashvili1999@gmail.com',
    password: 'Mrzippo123!',
    roleId: 1,
  };
  await UserModel.create(adminUser);
};

const removeAll = async () => {
  await RoleModel.deleteMany();
  await UserModel.deleteMany();
};
mongoose
  .connect(process.env.MONGO_DB || '')
  .then(async () => {
    await removeAll();
    await createRoles();
    await createAdminUser();
    console.log(colors.cyan.underline('Seeder succeed...'));
    process.exit(1);
  })
  .catch(async (e) => {
    console.error(colors.red.underline('seeder failed...'), e.message);
    process.exit(1);
  });
