const withFilters = async (Model, filters) => {
  const resObj = {};
  let searchQuery = filters?.search ? {
    $and: [
      { $or: filters?.search?.fields?.reduce((acc, cur) => ([...acc, { [cur]: { $regex: filters.search.text.toLowerCase(), $options: 'i' } }]), []) },
    ],
  } : {};

  if (filters.where) {
    searchQuery = {
      ...searchQuery,
      ...filters.where,
    };
  }

  const query = Model.find({ ...searchQuery });

  if (filters.select) {
    query.select(filters.select);
  }

  if (filters.sort) {
    query.sort({ [filters.sort.sortBy]: filters.sort.sortDir });
  } else {
    query.sort('-createdAt -_id');
  }

  if (filters.pagination) {
    const count = await Model.find({ ...searchQuery }).countDocuments();
    resObj.count = count;
    query.limit(filters.pagination.limit * 1);
    query.skip((filters.pagination.page - 1) * filters.pagination.limit);
  }

  if (filters.populate) {
    query.populate(filters.populate);
  }

  const list = await query;
  resObj.list = list;
  return resObj;
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
