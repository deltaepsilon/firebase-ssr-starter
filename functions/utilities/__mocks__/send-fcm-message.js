const sendFCMMessage = jest.fn(payload => {
  if (payload.token == 'invalid') {
    const error = new Error();
    error.code = 'messaging/registration-token-not-registered';
    
    throw error;
  }
});

module.exports = context => sendFCMMessage;
