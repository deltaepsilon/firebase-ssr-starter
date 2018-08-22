import baseRefSubscription from '../base-ref-subscription';

export default function SubscribeNotifications({ environment, currentUser }) {
  return baseRefSubscription(environment, 'notifications', [currentUser.uid]);
}
