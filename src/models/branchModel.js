import mongoose from 'mongoose';

const BranchSchema = new mongoose.Schema(
  {
    general: {
      name: {
        ka: {
          type: String,
          required: true,
        },
        en: {
          type: String,
          required: true,
        },
      },
      address: {
        ka: {
          type: String,
          required: true,
        },
        en: {
          type: String,
          required: true,
        },
      },
    },
    workingHours: {
      monday: {
        required: Boolean,
        data: [{
          start: String,
          end: String,
        }],
      },
      tuesday: {
        required: Boolean,
        data: [{
          start: String,
          end: String,
        }],
      },
      wednesday: {
        required: Boolean,
        data: [{
          start: String,
          end: String,
        }],
      },
      thursday: {
        required: Boolean,
        data: [{
          start: String,
          end: String,
        }],
      },
      friday: {
        required: Boolean,
        data: [{
          start: String,
          end: String,
        }],
      },
      saturday: {
        required: Boolean,
        data: [{
          start: String,
          end: String,
        }],
      },
      sunday: {
        required: Boolean,
        data: [{
          start: String,
          end: String,
        }],
      },
    },
    exceptions: [
      {
        date: Date,
        start: Date,
        end: Date,
        repeat: {
          type: String,
          enum: ['annually', 'one_time'],
        },
      },
    ],
    createdAt: { type: Date, select: false },
    updatedAt: { type: Date, select: false },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (doc, ret) => {
        delete ret._id;
      },
    },
    versionKey: false,
  },
);

const BranchModel = mongoose.model('Branch', BranchSchema);

export default BranchModel;
