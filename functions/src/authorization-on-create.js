module.exports = ({ admin, environment }) => user => {
  const db = admin.firestore();
  const usersCollection = db.collection(environment.schema.users)
  return {admin, environment}
};
