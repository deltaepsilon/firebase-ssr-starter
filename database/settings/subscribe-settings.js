import baseDocSubscriber from "../base-doc-subscriber";

export default function SubscribeUser({environment, uid}) {
  return baseDocSubscriber(environment, 'settings', uid);
};
