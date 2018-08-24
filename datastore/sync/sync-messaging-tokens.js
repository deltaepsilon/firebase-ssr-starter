import getMessagingToken from '../../utilities/messaging/get-messaging-token';
import SetMessagingTokenByPresence from '../../database/settings/set-messaging-token-by-presence';
import debounceAsync from '../../utilities/debounce-async';

export default ({ setState }, store) =>
  debounceAsync(async () => {
    const {
      currentUser,
      environment,
      isSubscribedToFCM,
      messagingToken,
      presence,
    } = store.getState();

    if (!!messagingToken != !!isSubscribedToFCM && presence && currentUser) {
      const { uid } = currentUser;
      const setMessagingTokenByPresence = SetMessagingTokenByPresence({
        environment,
        presence,
        uid,
      });

      const updatedMessagingToken = !isSubscribedToFCM ? false : await getMessagingToken();

      await setMessagingTokenByPresence(updatedMessagingToken);

      setState({
        isSubscribedToFCM: !!updatedMessagingToken,
        messagingToken: updatedMessagingToken,
      });
    }
  });
