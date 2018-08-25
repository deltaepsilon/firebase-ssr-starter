/* globals firebase, window */
export default ({ environment, uid }) => message => {
  const db = firebase.firestore();
  const userMessagesCollection = environment.schema.userMessages(db, uid);
  return userMessagesCollection.add({ origin: window.location.origin, ...message });
};
