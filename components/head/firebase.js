import React from 'react';
import Head from 'next/head';

export default ({ firebaseEnv }) => {
  return (
    <Head>
      <script src="https://www.gstatic.com/firebasejs/5.2.0/firebase-app.js" />
      <script src="https://www.gstatic.com/firebasejs/5.2.0/firebase-auth.js" />
      <script
        dangerouslySetInnerHTML={{
          __html: `firebase.initializeApp(${JSON.stringify(firebaseEnv)})`,
        }}
      />
    </Head>
  );
};
