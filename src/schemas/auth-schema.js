import joi from 'joi';

export const updatePasswordSchema = joi.object({
  currentPassword: joi.string().required(),
  newPassword: joi.string().pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^A-Za-z0-9]).{8,30}$/),
});

export const updateDetailsSchema = joi.object({
  firstName: joi.number().min(1),
  lastName: joi.number().min(1),
  // eslint-disable-next-line max-len
  email: joi.string().pattern(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/),
}).min(1);
