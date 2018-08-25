module.exports = function setId(id, obj) {
  return { __id: id, ...obj };
};
