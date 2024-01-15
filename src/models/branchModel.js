import mongoose from 'mongoose';
import EmployeeModel from './employeeModel.js';

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
      phone: {
        type: String,
        default: null,
      },
      email: {
        type: String,
        default: null,
        // eslint-disable-next-line max-len
        match: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      },
      managers: [{ type: mongoose.Schema.Types.ObjectId, ref: EmployeeModel }],
    },
    workingHours: {
      monday: {
        enabled: {
          type: Boolean,
          default: false,
        },
        data: {
          type: [{
            start: {
              type: String,
              default: null,
            },
            end: {
              type: String,
              default: null,
            },
          }],
          default: [{
            start: null,
            end: null,
          }],
        },
      },
      tuesday: {
        enabled: {
          type: Boolean,
          default: false,
        },
        data: {
          type: [{
            start: {
              type: String,
              default: null,
            },
            end: {
              type: String,
              default: null,
            },
          }],
          default: [{
            start: null,
            end: null,
          }],
        },
      },
      wednesday: {
        enabled: {
          type: Boolean,
          default: false,
        },
        data: {
          type: [{
            start: {
              type: String,
              default: null,
            },
            end: {
              type: String,
              default: null,
            },
          }],
          default: [{
            start: null,
            end: null,
          }],
        },
      },
      thursday: {
        enabled: {
          type: Boolean,
          default: false,
        },
        data: {
          type: [{
            start: {
              type: String,
              default: null,
            },
            end: {
              type: String,
              default: null,
            },
          }],
          default: [{
            start: null,
            end: null,
          }],
        },
      },
      friday: {
        enabled: {
          type: Boolean,
          default: false,
        },
        data: {
          type: [{
            start: {
              type: String,
              default: null,
            },
            end: {
              type: String,
              default: null,
            },
          }],
          default: [{
            start: null,
            end: null,
          }],
        },
      },
      saturday: {
        enabled: {
          type: Boolean,
          default: false,
        },
        data: {
          type: [{
            start: {
              type: String,
              default: null,
            },
            end: {
              type: String,
              default: null,
            },
          }],
          default: [{
            start: null,
            end: null,
          }],
        },
      },
      sunday: {
        enabled: {
          type: Boolean,
          default: false,
        },
        data: {
          type: [{
            start: {
              type: String,
              default: null,
            },
            end: {
              type: String,
              default: null,
            },
          }],
          default: [{
            start: null,
            end: null,
          }],
        },
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
    versionKey: false,
    id: false,
  },
);

const BranchModel = mongoose.model('Branch', BranchSchema);

export default BranchModel;
