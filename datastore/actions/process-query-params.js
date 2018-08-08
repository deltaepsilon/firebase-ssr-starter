/* globals location */
export default (state, search) => {
  const parts = search.slice(1).split('&');
  let update = {};

  parts.forEach(part => {
    const [key, value] = part.split('=');

    update[key] = value;
  });

  return update;
};
