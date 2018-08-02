module.exports = obj => {
  const result = {};

  for (let key in obj) {
    const value = obj[key];
    if (!isEmpty(value)) {
      result[key] = value;
    }
  }

  return result;
};

function isEmpty(value) {
  return typeof value != 'boolean' && !value;
}
