const GetRefs = require('./get-refs');

module.exports = context => async (uid, message) => {
  const getRefs = GetRefs(context);
  const statsRef = getRefs.messageStats(uid);

  return context.admin.firestore().runTransaction(async t => {
    const statsDoc = await t.get(statsRef);
    const stats = statsDoc.data();
    const count = (stats && stats.count) || 0;

    let update = {
      priority: (stats && stats.priority) || 0,
      uid,
      updated: new Date().toString(),
    };

    if (!message) {
      update = {
        ...update,
        count: Math.max(count - 1, 0),
      };
    } else {
      const senderIsReceiver = message && message.uid == uid;

      if (senderIsReceiver) {
        update = {
          ...update,
          displayName: message.displayName,
          email: message.email,
          photoURL: message.photoURL,
        };
      }

      update = {
        ...update,
        count: count + 1,
        lastMessage: message.created,
        lastMessage: message.text,
      };
    }

    return t.set(statsRef, update, { merge: true });
  });
};
