import React from 'react';
import Head from 'next/head';

export default ({ firebaseEnv }) => {
  return (
    <Head>
      <script src="https://www.gstatic.com/firebasejs/5.1.0/firebase-app.js" />
      <script
        dangerouslySetInnerHTML={{
          __html: `firebase.initializeApp(${JSON.stringify(firebaseEnv)})`,
        }}
      />
    </Head>
  );
};
