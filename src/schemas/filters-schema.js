import * as yup from 'yup';

const filtersSchema = yup.object().shape({
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
  sortBy: yup.string().test('sort', 'when sortBy is provided, sortDir is required field', function () {
    const { sortDir } = this.parent;
    const sortBy = this.originalValue;
    if (sortBy && !sortDir) {
      return false;
    }
    return true;
  }),
  sortDir: yup.string().oneOf(['asc', 'desc']).test('sort', 'when sortDir is provided, sortBy is required field', function () {
    const { sortBy } = this.parent;
    const sortDir = this.originalValue;
    if (sortDir && !sortBy) {
      return false;
    }
    return true;
  }),
});

export default filtersSchema;
