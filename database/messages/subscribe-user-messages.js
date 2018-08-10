import baseListSubscriber from '../base-list-subscriber';

export default function SubscribeUserMessages({ environment, uid }) {
  return baseListSubscriber(environment, 'userMessages', [uid], {
    orderBy: [{ name: 'created', sort: 'desc' }],
    limit: 25,
    listenForNew: true,
  });
}
