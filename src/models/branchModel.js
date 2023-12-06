import mongoose from 'mongoose';

const BranchSchema = new mongoose.Schema(
  {
    name: {
      ge: {
        type: String,
        required: true,
      },
      en: {
        type: String,
        required: true,
      },
    },
    address: {
      ge: {
        type: String,
        required: true,
      },
      en: {
        type: String,
        required: true,
      },
    },
    workingHours: {
      required: true,
      monday: {
        startHour: Date,
        endHour: Date,
      },
      tuesday: {
        startHour: Date,
        endHour: Date,
      },
      wednesday: {
        startHour: Date,
        endHour: Date,
      },
      thursday: {
        startHour: Date,
        endHour: Date,
      },
      friday: {
        startHour: Date,
        endHour: Date,
      },
      saturday: {
        startHour: Date,
        endHour: Date,
      },
      sunday: {
        startHour: Date,
        endHour: Date,
      },
      exceptions: [
        {
          date: Date,
          startHour: Date,
          endHour: Date,
        },
      ],
    },
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
