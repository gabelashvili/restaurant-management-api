import * as yup from 'yup';

export const updatePasswordSchema = yup.object({
  currentPassword: yup.string().required(),
  newPassword: yup.string().min(8),
});
