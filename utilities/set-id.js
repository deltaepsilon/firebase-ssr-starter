export default function setId(id, obj) {
  return { __id: id, ...obj };
}
