export default ({ environment, uid}) => message => {
  const db = admin.firestore();
  const userMessagesCollection = environment.schema.userMessages(db, uid);
  return userMessagesCollection.add(message)
}
  