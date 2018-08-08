import baseDocSubscriber from '../base-doc-subscriber';

export default function SubscribeUser({ environment, uid }) {
  if (!uid) {
    throw new Error(`uid missing`)
  }

  return baseDocSubscriber(environment, 'user', uid);
}
