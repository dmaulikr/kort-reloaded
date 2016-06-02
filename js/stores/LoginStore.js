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
    this._userCredential = null;
    this._loggedIn = false;
    this._loadingFromLocalStorage = true;

    this._loadUserCredential();
  }

  async exampleStorage() {
    //await AsyncStorage.setItem(userIdStorageKey, '123');
    let userId = await AsyncStorage.getItem(userIdStorageKey);
    await AsyncStorage.removeItem(userIdStorageKey);
    userId = await AsyncStorage.getItem(userIdStorageKey);
  }

  async _loadUserCredential() {
    this._loadingFromLocalStorage = true;
    try {
      const userId = await AsyncStorage.getItem(userIdStorageKey);
      const secret = await AsyncStorage.getItem(secretStorageKey);
      console.log(`userId: ${userId}`);
      console.log(`secret: ${secret}`);
      console.log((userId != null && secret != null));
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
    console.log(`userCredential: ${userCredential}`);
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
      const userCredential = action.data;
      loginStore._saveUserCredential(userCredential)
      loginStore._logInUser(userCredential);
      break;
    case ActionTypes.LOGIN_LOGOUT:
      loginStore._logOutUser();
      break;
    default:
      return;
  }
});

export default loginStore;
