export const success = {
  common: {
    dataUpdated: 'data_updated',
  },
  user: {
    signIn: 'sign_in',
    passwordUpdate: 'password_update',
  },
  branch: {
    created: 'branch_created',
    updated: 'branch_updated',
    removed: 'branch_removed',
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
    notFound: 'user_not_found',
    invalidCredentials: 'invalid_credentials',
    unauthorized: 'unauthorized',
  },
  fileUpload: {
    invalidFileFormat: 'invalid_file_format',
    fileTooLarge: 'file_too_large',
    fileNotFound: 'file_not_found',
  },
  branch: {
    notFound: 'branch_not_found',
  },
};
