const withFilters = async (Model, filters) => {
  const query = Model.find().sort({ createdAt: -1 });

  if (filters.pagination) {
    query.limit(filters.pagination.limit * 1);
    query.skip((filters.pagination.page - 1) * filters.pagination.limit);
  }

  if (filters.sort) {
    query.sort(filters.sort);
  }

  const res = await query;

  return res;
};

export default withFilters;

// const example = {
//   pagination: {
//     limit: 10,
//     page: 1,
//   },
//   sort: {
//     createdAt: -1,
//   },
// };
