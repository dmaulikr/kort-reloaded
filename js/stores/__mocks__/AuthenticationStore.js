const authenticationStore = jest.genMockFromModule('../AuthenticationStore');

function getUserId() {
  return '42';
}

authenticationStore.getUserId = getUserId;

module.exports = authenticationStore;
