export default async function setReview(environment, userId, review) {
  const db = firebase.firestore();
  const statsRef = environment.schema.messageStats(db, userId);

  return statsRef.update({ review });
}
