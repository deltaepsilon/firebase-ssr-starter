/* globals firebase */

export default async function deleteImage(path) {
  const cleanPath = path.replace(/gs:\/\/[^\/]+/, '');
  return firebase
    .storage()
    .ref(cleanPath)
    .delete();
}
