export const success = {
  common: {
    dataUpdated: 'data_updated',
  },
  user: {
    signIn: 'sign_in',
    passwordUpdate: 'password_update',
  },
};

export const errors = {
  common: {
    invalidParams: 'invalid_params',
    notFound: 'data_not_found',
    somethingWentWrong: 'something_went_wrong',
    tooManyArguments: 'too_many_arguments',
  },
  user: {
    firstNameRequired: 'firstName_required',
    lastNameRequired: 'lastName_required',
    emailRequired: 'email_required',
    wrongEmailFormat: 'wrong_email_format',
    wrongPasswordFormat: 'wrong_password_format',
    passwordRequired: 'password_required',
    roleRequired: 'role_required',
    notFound: 'user_not_found',
    invalidCredentials: 'invalid_credentials',
    unauthorized: 'unauthorized',
  },
  fileUpload: {
    invalidFileFormat: 'invalid_file_format',
    fileTooLarge: 'file_too_large',
    fileNotFound: 'file_not_found',
  },
};
