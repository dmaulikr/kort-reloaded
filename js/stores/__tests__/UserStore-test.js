jest.unmock('../UserStore');
jest.unmock('../../dto/User');

jest.setMock('react-native', {
  AsyncStorage: {
    multiGet: jest.fn(),
  },
});

describe('UserStore', () => {
  const ActionTypes = require('../../constants/ActionTypes');
  const User = require('../../dto/User').default;
  const ReactNative = require('react-native');
  const { AsyncStorage } = ReactNative;

  let AppDispatcher;
  let userStore;
  let callback;

  function createUser() {
    return new User('42', 'Peter Bart', 'pbart', '123', 'Google', 'A02KXLKU093092840', '23', '23',
      '100', '409', '324837592380', null, true);
  }

  function createUserUpdateInfo() {
    return new User('42', 'Peter Bart', 'pbartking', '123', null, null, null, null, null, null,
      '324837592380', null, null
    );
  }

  function createUpdatedUser() {
    return new User('42', 'Peter Bart', 'pbartking', '123', 'Google', 'A02KXLKU093092840', '23',
      '23', '100', '409', '324837592380', null, true
    );
  }

  function createDifferentUser() {
    return new User('43', 'Steven Bartoszuk', 'szuk', '456', 'Google', '892KASDF9J920J', '23',
      '23', '100', '409', '324837592380', null, true);
  }

  const actionUserLoaded = {
    actionType: ActionTypes.USER_LOAD,
    data: createUser(),
  };

  const actionDifferentUserLoaded = {
    actionType: ActionTypes.USER_LOAD,
    data: createDifferentUser(),
  };

  const actionUserInfoUpdated = {
    actionType: ActionTypes.USER_UPDATE,
    data: createUserUpdateInfo(),
  };

  beforeEach(() => {
    AppDispatcher = require('../../dispatcher/AppDispatcher').default;
    userStore = require('../UserStore').default;
    callback = AppDispatcher.register.mock.calls[0][0];
  });

  it('registers a callback with the dispatcher', () => {
    expect(AppDispatcher.register.mock.calls.length).toBe(1);
  });

  describe('getUser()', () => {
    it('initializes with no user item', () => {
      const all = userStore.getUser();
      expect(all).toBeNull();
    });

    it('updates when user is loaded', () => {
      callback(actionUserLoaded);
      const user = userStore.getUser(createUser().id);
      expect(user).toEqual(createUser());
    });

    it('keeps the old user when a new one is loaded', () => {
      callback(actionUserLoaded);
      callback(actionDifferentUserLoaded);
      const user = userStore.getUser(createUser().id);
      expect(user).toEqual(createUser());
    });

    it('returns null when userId does not match any loaded user', () => {
      callback(actionUserLoaded);
      const user = userStore.getUser(createDifferentUser().id);
      expect(user).toBeNull();
    });

    it('updates user information upon user edit update', () => {
      callback(actionUserLoaded);
      callback(actionUserInfoUpdated);
      const user = userStore.getUser(createUser().id);
      expect(user).toEqual(createUpdatedUser());
    });

    it(
      'does not load user upon user edit update if the respective user has not been loaded before',
      () => {
        callback(actionUserInfoUpdated);
        const user = userStore.getUser(createUserUpdateInfo().id);
        expect(user).toBeNull();
      }
    );
  });
});
