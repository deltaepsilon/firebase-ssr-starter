import React from 'react';
import { Provider } from 'unistore/react';
import { store } from '../../datastore';
import FirebaseHead from '../head/firebase';

export default ({ environment, children }) => {
  return (
    <>
      <FirebaseHead firebaseEnv={environment.firebase} />
      <Provider store={store}>
        <main>{children}</main>
      </Provider>
    </>
  );
};
