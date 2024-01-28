export const success = {
  common: {
    dataUpdated: 'data_updated',
  },
  employee: {
    signIn: 'sign_in',
    passwordUpdate: 'password_update',
    created: 'employee_created',
    updated: 'employee_updated',
    removed: 'employee_removed',
  },
  branch: {
    created: 'branch_created',
    updated: 'branch_updated',
    removed: 'branch_removed',
  },
  productCategory: {
    created: 'product_category_created',
    updated: 'product_category_updated',
    removed: 'product_category_removed',
  },
};

export const errors = {
  common: {
    invalidParams: 'invalid_params',
    notFound: 'data_not_found',
    somethingWentWrong: 'something_went_wrong',
    tooManyArguments: 'too_many_arguments',
  },
  employee: {
    notFound: 'user_not_found',
    invalidCredentials: 'invalid_credentials',
    unauthorized: 'unauthorized',
    associatedBranch: 'associated_branch',
  },
  fileUpload: {
    invalidFileFormat: 'invalid_file_format',
    fileTooLarge: 'file_too_large',
    fileNotFound: 'file_not_found',
  },
  branch: {
    notFound: 'branch_not_found',
  },
  productCategory: {
    notFound: 'product_category_not_found',
  },
};
