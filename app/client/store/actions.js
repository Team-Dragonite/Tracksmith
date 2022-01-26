const storeUsername = (username) => {
  return {type: 'USER_LOGGED_IN', payload: username}
};

export default storeUsername;