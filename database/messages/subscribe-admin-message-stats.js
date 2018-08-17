import baseListSubscriber from '../base-list-subscriber';

export default function SubscribeAdminMessageStats({ environment }) {
  return baseListSubscriber(environment, 'messageStats', [], {
    orderBy: [{ name: 'count', sort: 'desc' }],
    limit: 25,
  });
}
