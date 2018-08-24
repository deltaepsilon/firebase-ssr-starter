module.exports = ({ admin }) => async ({ token, data }) => admin.messaging().send({ token, data });
