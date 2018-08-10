module.exports = ({ admin, environment }) => async uid => {
  const doc = await admin
    .firestore()
    .collection(environment.schema.users)
    .doc(uid)
    .get();

  return doc.data();
};
