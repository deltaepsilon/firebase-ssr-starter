/* globals firebase */
export default async function addPushNotification({ environment, uid, type, detail }) {
  const db = firebase.database();
  const pushNotificationsRef = environment.schema.pushNotifications(db, uid);
  const payload = { type, detail, created: new Date().toString() };

  return pushNotificationsRef.push(payload);
}
