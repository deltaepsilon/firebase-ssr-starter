/* globals firebase */
export default async function acknowledgeNotificationsByUserAndType({
  environment,
  uid,
  type,
}) {
  const db = firebase.database();
  const notificationsRef = environment.schema.notifications(db, uid);

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
