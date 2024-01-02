import * as yup from 'yup';

const filtersSchema = yup.object().shape({
  pagination: yup.object().shape({
    page: yup.number().min(1).test('pagination', 'when page is provided, limit is required field', function () {
      const { limit } = this.parent;
      const page = this.originalValue;
      if (page && !limit) {
        return false;
      }
      return true;
    }),
    limit: yup.number().test('pagination', 'when limit is provided, page is required field', function () {
      const { page } = this.parent;
      const limit = this.originalValue;
      if (limit && !page) {
        return false;
      }
      return true;
    }),
  }),
  order: yup.object().shape({
    orderBy: yup.string().test('sort', 'when orderBy is provided, orderDir is required field', function () {
      const { orderDir } = this.parent;
      const orderBy = this.originalValue;
      if (orderBy && !orderDir) {
        return false;
      }
      return true;
    }),
    orderDir: yup.string().oneOf(['asc', 'desc']).test('sort', 'when orderDir is provided, orderBy is required field', function () {
      const { orderBy } = this.parent;
      const orderDir = this.originalValue;
      if (orderDir && !orderBy) {
        return false;
      }
      return true;
    }),
  }),
  select: yup.string(),
  search: yup.object().shape({
    text: yup.string(),
    fields: yup.array().of(yup.string()),
  }),
  populate: yup.string(),
}).noUnknown().strict(true);

export default filtersSchema;
