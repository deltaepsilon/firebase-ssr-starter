import React from 'react';

export default ({ firebaseEnv }) => {
  return (
    <>
      <script src="https://www.gstatic.com/firebasejs/5.4.1/firebase-app.js" />
      <script src="https://www.gstatic.com/firebasejs/5.4.1/firebase-auth.js" />
      <script src="https://www.gstatic.com/firebasejs/5.4.1/firebase-messaging.js" />
      <script src="https://www.gstatic.com/firebasejs/5.4.1/firebase-firestore.js" />
      <script src="https://www.gstatic.com/firebasejs/5.4.1/firebase-database.js" />
      <script src="https://www.gstatic.com/firebasejs/5.4.1/firebase-storage.js" />
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
