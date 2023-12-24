import mongoose from 'mongoose';

const RoleSchema = new mongoose.Schema(
  {
    roleName: {
      type: String,
      required: true,
      unique: true,
    },
    roleId: {
      type: Number,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: false,
    versionKey: false,
  },
);

const RoleModel = mongoose.model('Role', RoleSchema);

export default RoleModel;
