export default async function markRead(environment, userId) {
  const db = firebase.firestore();
  const statsRef = environment.schema.messageStats(db, userId);
  let updatedStats;

  await db.runTransaction(async t => {
    const statsDoc = await t.get(statsRef);
    const stats = statsDoc.data();

    stats.read = stats.count;

    updatedStats = stats;

    return t.set(statsRef, stats);
  });

  return updatedStats;
}
