import { AsyncStorage } from 'react-native';

import ActionTypes from '../constants/ActionTypes';
import Config from '../constants/Config';

import AppDispatcher from '../dispatcher/AppDispatcher';

import Store from './Store';

const storageKey = Config.USER_CREDENTIAL_STORAGE_KEY;

class LoginStore extends Store {
  constructor() {
    super();
    this._removeUserCredential();
    this._userCredential = this._loadUserCredential();
    this._loggedIn = this._userCredential !== null;
  }

  async _loadUserCredential() {
    try {
      const stringifiedUserCredential = await AsyncStorage.getItem(storageKey);
      const userCredential = JSON.parse(stringifiedUserCredential);

      return userCredential;
    } catch (error) {
      console.log(error);
    }

    return null;
  }

  async _saveUserCredential(userCredential) {
    try {
      const stringifiedUserCredential = JSON.stringify(userCredential);
      await AsyncStorage.setItem(storageKey, stringifiedUserCredential);
    } catch (error) {
      console.log(error);
    }
  }

  async _removeUserCredential() {
    try {
      await AsyncStorage.removeItem(storageKey);
    } catch (error) {
      console.log(error);
    }
  }

  _logInUser(userCredential) {
    this._saveUserCredential(userCredential);
    this._userCredential = userCredential;
    this._loggedIn = true;
    super.emitChange();
  }

  _logOutUser() {
    this._removeUserCredential();
    this._userCredential = null;
    this._loggedIn = false;
    super.emitChange();
  }

  getUserCredential() {
    return this._userCredential;
  }

  isLoggedIn() {
    return this._loggedIn;
  }
}

const loginStore = new LoginStore();

loginStore.dispatchToken = AppDispatcher.register((action) => {
  switch (action.actionType) {
    case ActionTypes.LOGIN_VERIFY:
      loginStore._logInUser(action.data);
      break;
    case ActionTypes.LOGIN_LOGOUT:
      loginStore._logOutUser();
      break;
    default:
      return;
  }
});

export default loginStore;
