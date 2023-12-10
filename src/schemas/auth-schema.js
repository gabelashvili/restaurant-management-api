import * as yup from 'yup';

export const updatePasswordSchema = yup.object({
  currentPassword: yup.string().required(),
  newPassword: yup.string().matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^A-Za-z0-9]).{8,30}$/),
});

export const updateDetailsSchema = yup.object({
  firstName: yup.number().min(1),
  lastName: yup.number().min(1),
  // eslint-disable-next-line max-len
  email: yup.string().matches(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/),
}).atLeastOneOf(['firstName', 'lastName', 'email']);
