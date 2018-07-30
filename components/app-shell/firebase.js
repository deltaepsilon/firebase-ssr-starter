import React from 'react';

export default ({ firebaseEnv }) => {
  return (
    <>
      <script src="https://www.gstatic.com/firebasejs/5.2.0/firebase-app.js" />
      <script src="https://www.gstatic.com/firebasejs/5.2.0/firebase-auth.js" />
      <script src="https://www.gstatic.com/firebasejs/5.2.0/firebase-messaging.js" />
      <script src="https://www.gstatic.com/firebasejs/5.2.0/firebase-firestore.js" />
      <script
        dangerouslySetInnerHTML={{
          __html: `
            if (typeof firebase == 'undefined') {
              throw new Error('Firebase SDK not detected.');
            } else {
              firebase.initializeApp(${JSON.stringify(firebaseEnv)})
              firebase.firestore().settings({ timestampsInSnapshots: true })
            }
          `,
        }}
      />
    </>
  );
};
