import baseListSubscriber from '../base-list-subscriber';

export default function SubscribeAdminMessageStats({ environment }) {
  return baseListSubscriber(environment, 'messageStats', [], {
    orderBy: [{ name: 'priority', sort: 'desc' }, { name: 'updated', sort: 'desc' }],
    limit: 25,
  });
}
