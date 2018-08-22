import baseRefSubscription from '../base-ref-subscription';

export default function SubscribeNotifications({ environment, uid }) {
  return baseRefSubscription(environment, 'pushNotifications', [uid]);
}
