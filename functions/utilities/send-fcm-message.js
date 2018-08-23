module.exports = ({ admin }) => async ({ token, data }) => {
  return admin.messaging().send({ token, data });
};
