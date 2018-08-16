import baseListSubscriber from '../base-list-subscriber';

export default function SubscribeUser({ environment }) {
  return baseListSubscriber(environment, 'users', [], {
    orderBy: [{ name: 'creationTime', sort: 'desc' }],
    limit: 25,
  });
}
