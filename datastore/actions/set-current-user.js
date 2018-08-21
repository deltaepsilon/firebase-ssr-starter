const emptyClaims = {};
const emptyUser = {
  claims: {},
};

export default ({ claims, user }, currentUser) => ({
  currentUser,
  claims: currentUser ? claims : emptyClaims,
  user: currentUser ? user : emptyUser,
});
