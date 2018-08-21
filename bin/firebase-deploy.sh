echo attempting to deploy with the following CI token: $FIREBASE_TOKEN
set "NODE_TLS_REJECT_UNAUTHORIZED=0"
firebase deploy --token $FIREBASE_TOKEN