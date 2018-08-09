module.exports = function parseSearch(search) {
  const parts = search.slice(1).split('&');
  let result = {};

  parts.forEach(part => {
    const [key, value] = part.split('=');

    result[key] = value;
  });

  return result;
};
