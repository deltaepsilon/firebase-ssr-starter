import setId from './set-id';

export default function flatten(obj) {
  return obj
    ? Object.keys(obj).reduce((result, key) => (result.push(setId(key, obj[key])), result), [])
    : [];
}
