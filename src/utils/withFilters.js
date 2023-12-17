const withFilters = async (Model, filters) => {
  const resObj = {};
  const searchQuery = filters?.search ? {
    $and: [
      { $or: filters?.search?.fields?.reduce((acc, cur) => ([...acc, { [cur]: { $regex: filters.search.text.toLowerCase(), $options: 'i' } }]), []) },
    ],
  } : {};

  const query = Model.find(searchQuery)
    .sort({ createdAt: -1 });

  if (filters.select) {
    query.select(filters.select);
  }

  if (filters.sort) {
    query.sort({ [Object.keys(filters.sort)[0]]: Object.values(filters.sort)[0] });
  }

  if (filters.pagination) {
    const count = await Model.countDocuments();
    resObj.count = count;
    query.limit(filters.pagination.limit * 1);
    query.skip((filters.pagination.page - 1) * filters.pagination.limit);
  }

  if (filters.sort) {
    query.sort(filters.sort);
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