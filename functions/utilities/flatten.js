const setId = require('./set-id');

module.exports = function flatten(obj) {
  return obj
    ? Object.keys(obj).reduce((result, key) => (result.push(setId(key, obj[key])), result), [])
    : [];
};
