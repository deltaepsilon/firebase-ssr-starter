/* globals firebase */
export default (environment, uid) => async settings => {
  const db = firebase.firestore();
  const doc = environment.schema.settings(db, uid);

  return doc.set(settings, { merge: true });
};
