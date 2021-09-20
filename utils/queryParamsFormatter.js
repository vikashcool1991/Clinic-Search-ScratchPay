module.exports = {
  convertQueryParamsToLowerCase(query) {
    const queryObject = { ...query };
    Object.keys(queryObject).forEach(key => {
      queryObject[key] = queryObject[key].toLowerCase();
    });
    return queryObject;
  },
};
