import { AsyncStorage } from 'react-native';

import ActionTypes from '../constants/ActionTypes';
import Config from '../constants/Config';

import AppDispatcher from '../dispatcher/AppDispatcher';

import UserCredential from '../dto/UserCredential';

import Store from './Store';

const userIdStorageKey = Config.STORAGE_KEY_USER_ID;
const secretStorageKey = Config.STORAGE_KEY_SECRET;

class AuthenticationStore extends Store {
  constructor() {
    super();
    this._userCredential = null;
    this._loggedIn = false;
  }

  async _loadUserCredential() {
    try {
      const userId = await AsyncStorage.getItem(userIdStorageKey);
      const secret = await AsyncStorage.getItem(secretStorageKey);
      console.log(userId);
      if (userId != null && secret != null) {
        const userCredential = new UserCredential(userId, secret);
        this._logInUser(userCredential);
      } else {
        super.emitChange();
      }
    } catch (error) {
      console.log(error);
    }
  }

  async _saveUserCredential(userCredential) {
    try {
      await AsyncStorage.setItem(userIdStorageKey, userCredential.userId);
      await AsyncStorage.setItem(secretStorageKey, userCredential.secret);
    } catch (error) {
      console.log(error);
    }
  }

  async _removeUserCredential() {
    try {
      await AsyncStorage.removeItem(userIdStorageKey);
      await AsyncStorage.removeItem(userIdStorageKey);
    } catch (error) {
      console.log(error);
    }
  }

  _logInUser(userCredential) {
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

  isLoadingFromLocalStorage() {
    return this._loadingFromLocalStorages;
  }
}

const authenticationStore = new AuthenticationStore();

authenticationStore.dispatchToken = AppDispatcher.register((action) => {
  switch (action.actionType) {
    case ActionTypes.AUTHENTICATION_LOGOUT:
      authenticationStore._logOutUser();
      break;
    case ActionTypes.AUTHENTICATION_LOAD_CREDENTIAL:
      authenticationStore._loadUserCredential();
      break;
    case ActionTypes.AUTHENTICATION_VERIFY:
      authenticationStore._saveUserCredential(action.data);
      authenticationStore._logInUser(action.data);
      break;
    default:
      return;
  }
});

export default authenticationStore;
