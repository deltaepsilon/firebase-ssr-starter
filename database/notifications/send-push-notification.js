/* globals firebase */
export default async function ({
  environment,
  currentUser,
  type,
}) {
  const db = firebase.database();
  const notificationsRef = environment.schema.notifications(db, currentUser.uid);

  return notificationsRef.transaction(notifications => {
    const result = {};

    for (let id in notifications) {
      let notification = notifications[id];

      if (notification.type != type) {
        result[id] = notification;
      }
    }

    return result;
  });
}
