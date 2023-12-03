const responseMessages = {
  error: {
    serverError: 'server_error',
    firstNameRequired: 'firstName_required',
    lastNameRequired: 'lastName_required',
    emailRequired: 'email_required',
    invalidEmail: 'invalid_email',
    invalidPasswordFormat: 'invalid_password_format',
    passwordRequired: 'password_required',
    roleIdRequired: 'roleId_required',
    invalidId: 'invalid_id',
    invalidParams: 'invalid_params',
    dataNotFound: 'data_not_found',
    userNotFound: 'user_not_found',
    unauthorized: 'unauthorized',
    somethingWentWrong: 'something_went_wrong',
    invalidCredentials: 'invalid_credentials',
    tooManyArguments: 'too_many_arguments',
    invalidFileFormat: 'invalid_file_format',
    fileTooLarge: 'file_too_large',
    fileNotFound: 'file_not_found',
  },
  success: {
    signIn: 'sign_in',
    passwordUpdate: 'password_update',
    detailsUpdate: 'details_update',
  },
};

export default responseMessages;
