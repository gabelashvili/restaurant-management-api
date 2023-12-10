import * as yup from 'yup';

yup.addMethod(yup.object, 'atLeastOneOf', function (list) {
  return this.test({
    name: 'atLeastOneOf',
    // eslint-disable-next-line no-template-curly-in-string
    message: 'must have at least one of these keys: ${keys}',
    exclusive: true,
    params: { keys: list.join(', ') },
    test: (value) => value == null || list.some((f) => !!value[f]),
  });
});

export const updatePasswordSchema = yup.object({
  currentPassword: yup.string().required(),
  newPassword: yup.string().matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^A-Za-z0-9]).{8,30}$/),
});

export const updateDetailsSchema = yup.object({
  firstName: yup.string().min(3),
  lastName: yup.string().min(1),
  // eslint-disable-next-line max-len
  email: yup.string().matches(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/),
}).atLeastOneOf(['firstName', 'lastName', 'email']);
