import * as yup from 'yup';
import { multiLangSchema } from './common-schemas.js';

export const upsertProductCategorySchema = yup.object().shape({
  name: multiLangSchema.required(),
}).required().noUnknown(true)
  .strict();
