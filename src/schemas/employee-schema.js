import * as yup from 'yup';
import { multiLangSchema } from './common-schemas.js';

export const upsertEmployeeSchema = yup.object({
  firstName: multiLangSchema.required(),
  lastName: multiLangSchema.required(),
  // eslint-disable-next-line max-len
  email: yup.string().matches(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).required(),
  phone: yup.string().required(),
  roleId: yup.number().required(),
}).noUnknown(true).strict();
