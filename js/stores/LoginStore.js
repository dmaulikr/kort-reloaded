import { AsyncStorage } from 'react-native';

import ActionTypes from '../constants/ActionTypes';
import Config from '../constants/Config';

import AppDispatcher from '../dispatcher/AppDispatcher';

import UserCredential from '../dto/UserCredential';

import Store from './Store';

const userIdStorageKey = Config.STORAGE_KEY_USER_ID;
const secretStorageKey = Config.STORAGE_KEY_SECRET;

class LoginStore extends Store {
  constructor() {
    super();
    this._userCredential = new UserCredential('4156', '680ebf81e9b139e894769b42cd57e077e35859c5'); // = null;
    this._loggedIn = false;
    this._loadingFromLocalStorage = true;

    // this._loadUserCredential();
  }

  async _loadUserCredential() {
    this._loadingFromLocalStorage = true;
    try {
      const userId = await AsyncStorage.getItem(userIdStorageKey);
      const secret = await AsyncStorage.getItem(secretStorageKey);
      if (userId != null && secret != null) {
        const userCredential = new UserCredential(userId, secret);
        this._logInUser(userCredential);
      }
    } catch (error) {
      console.log(error);
    }
    this._loadingFromLocalStorage = false;
    super.emitChange();
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

const loginStore = new LoginStore();

loginStore.dispatchToken = AppDispatcher.register((action) => {
  switch (action.actionType) {
    case ActionTypes.LOGIN_VERIFY:
      loginStore._saveUserCredential(action.data);
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
