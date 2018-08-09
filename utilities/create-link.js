export default function createLink(root, params) {
  let link = root;
  let parts = [];

  for (let key in params) {
    parts.push(`${key}=${params[key]}`);
  }

  if (parts.length) {
    link = `${link}?${parts.join('&')}`;
  }

  return link;
}
