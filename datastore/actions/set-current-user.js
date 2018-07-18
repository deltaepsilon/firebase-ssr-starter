export default ({ claims }, currentUser) => ({ currentUser, claims: currentUser ? claims : null });
