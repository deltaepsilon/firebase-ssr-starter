/* gobals firebase */
export default async function addPushNotification({ environment, uid, type, detail }) {
  const db = firebase.database();
  const pushNotificationsRef = environment.schema.pushNotifications(db, uid);

  return pushNotificationsRef.push({ type, detail });
}
