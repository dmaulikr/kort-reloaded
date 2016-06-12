jest.unmock('../AuthenticationStore');
jest.unmock('../../dto/UserCredential');

jest.setMock('react-native', {
  multiGet: jest.fn(),
});

describe('AuthenticationStore', () => {
  const UserCredential = require('../../dto/UserCredential').default;

  let AppDispatcher;
  let authenticationStore;
  beforeEach(() => {
    AppDispatcher = require('../../dispatcher/AppDispatcher').default;
    authenticationStore = require('../AuthenticationStore').default;
  });

  it('registers a callback with the dispatcher', () => {
    expect(AppDispatcher.register.mock.calls.length).toBe(1);
  });

  describe('getUserCredential()', () => {
    it('initializes with no user credential item', () => {
      const all = authenticationStore.getUserCredential();
      expect(all).toBeNull();
      const isLoggedIn = authenticationStore.isLoggedIn();
      expect(isLoggedIn).toBeFalsy();
    });
  });
});
