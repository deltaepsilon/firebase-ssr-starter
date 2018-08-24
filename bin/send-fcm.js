const admin = require('../functions/utilities/test-admin');
const environment = require('../functions/environments/environment.test');
const context = { admin, environment };
const sendFCMMessage = require('../functions/utilities/send-fcm-message')(context);
const message = {
  token:
    'dDKITtRpUCE:APA91bHv_hGbj7zjhUgr9-yjvOJcmkOmO15qi1AhSvHDo_FCP_v-gQU_asqEsXRUZuhOePo-62Wix5rw1dDMb892bm1DQiAMVZuAAvaoAHZu-mZG8UaHzPmLI2I2DXdbNv__eilrJ6lb',
  data: {
    type: 'admin',
    title: 'click me',
    text: 'test message',
    url: 'http://localhost:3000/app/messages',
  },
};

send();

async function send() {
  try {
    await sendFCMMessage(message);
  } catch (e) {
    console.error(e);
  }

  console.info('complete!');

  process.exit();
}
