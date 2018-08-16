const GetRefs = require('./get-refs');

module.exports = context => async (uid, message) => {
  const getRefs = GetRefs(context);
  const statsRef = getRefs.messageStats(uid);

  return context.admin.firestore().runTransaction(async t => {
    const statsDoc = await t.get(statsRef);
    const stats = statsDoc.data();

    const count = (stats && stats.count) || 0;
    let update;

    if (!message) {
      update = {
        count: Math.max(count - 1, 0),
        uid,
      };
    } else {
      update = {
        count: count + 1,
        lastMessage: message.created,
        displayName: message.displayName,
        email: message.email,
        photoUrl: message.photoUrl,
        lastMessage: message.text,
        uid,
      };
    }

    return t.set(statsRef, update);
  });
};
