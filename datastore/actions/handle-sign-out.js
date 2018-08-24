import SetMessagingTokenByPresence from '../../database/settings/set-messaging-token-by-presence';

export default async ({ environment, presence, currentUser }) => {
  if (currentUser) {
    const setMessagingTokenByPresence = SetMessagingTokenByPresence({
      environment,
      presence,
      uid: currentUser.uid,
    });

    await setMessagingTokenByPresence(false);
  }

  return { currentUser: null, claims: null, messagingToken: null };
};
