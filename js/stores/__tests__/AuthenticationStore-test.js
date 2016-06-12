jest.unmock('../AuthenticationStore');
jest.unmock('../../dto/UserCredential');

jest.setMock('react-native', {
  multiGet: jest.fn(),
});

describe('AuthenticationStore', () => {
  const ActionTypes = require('../../constants/ActionTypes');
  const UserCredential = require('../../dto/UserCredential').default;
  const ReactNative = require('react-native');
  const { AsyncStorage } = ReactNative;

  let AppDispatcher;
  let authenticationStore;
  let callback;

  function createUserCredential() {
    return new UserCredential('42', '4242');
  }

  const actionUserVerified = {
    actionType: ActionTypes.AUTHENTICATION_VERIFY,
    data: createUserCredential(),
  };

  const actionUserLoggedOut = {
    actionType: ActionTypes.AUTHENTICATION_LOGOUT,
  };

  beforeEach(() => {
    AppDispatcher = require('../../dispatcher/AppDispatcher').default;
    authenticationStore = require('../AuthenticationStore').default;
    callback = AppDispatcher.register.mock.calls[0][0];
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
