import * as yup from 'yup';

export const multiLangSchema = yup
  .object()
  .shape({
    ka: yup.string().required(),
    en: yup.string().required(),
  })
  .required();
