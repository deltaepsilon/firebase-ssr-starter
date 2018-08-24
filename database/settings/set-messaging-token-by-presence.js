/* globals firebase */

export default ({ environment, presence, uid }) => async messagingToken => {
  const DELETE_VALUE = firebase.firestore.FieldValue.delete();
  const db = firebase.firestore();
  const settingsRef = environment.schema.settings(db, uid);
  let result;

  await db.runTransaction(async t => {
    const settingsDoc = await t.get(settingsRef);
    const settings = settingsDoc.data() || {};

    if (!settings.messagingTokens) {
      settings.messagingTokens = {};
    }

    for (let key in settings.messagingTokens) {
      if (settings.messagingTokens[key] == messagingToken) {
        settings.messagingTokens[key] = DELETE_VALUE;
      }
    }

    settings.messagingTokens[presence] = messagingToken || DELETE_VALUE;
    
    result = settings;

    return t.set(settingsRef, settings, { merge: true });
  });

  return result;
};
