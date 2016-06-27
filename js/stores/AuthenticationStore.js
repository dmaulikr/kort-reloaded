import { AsyncStorage } from 'react-native';
import I18n from 'react-native-i18n';

import ActionTypes from '../constants/ActionTypes';
import Config from '../constants/Config';

import AppDispatcher from '../dispatcher/AppDispatcher';

import Error from '../dto/Error';
import UserCredential from '../dto/UserCredential';

import Store from './Store';

const userIdStorageKey = Config.STORAGE_KEY_USER_ID;
const secretStorageKey = Config.STORAGE_KEY_SECRET;

class AuthenticationStore extends Store {
  constructor() {
    super();
    this._userCredential = null;
    this._loggedIn = false;
    this._error = null;
  }

  async _loadUserCredential() {
    try {
      const userId = await AsyncStorage.getItem(userIdStorageKey);
      const secret = await AsyncStorage.getItem(secretStorageKey);
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

  _raiseError() {
    this.error = new Error(I18n.t('error_title_default'), I18n.t('error_message_default'));
  }

  _clearError() {
    this._error = null;
  }

  getUserCredential() {
    return this._userCredential;
  }

  getUserId() {
    return this._userCredential.userId;
  }

  getSecret() {
    return this._userCredential.secret;
  }

  isLoggedIn() {
    return this._loggedIn;
  }

  isLoadingFromLocalStorage() {
    return this._loadingFromLocalStorages;
  }

  getError() {
    return this._error;
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
    case ActionTypes.AUTHENTICATION_ERROR_VERIFY:
    case ActionTypes.AUTHENTICATION_ERROR_LOGOUT:
      authenticationStore._raiseError();
      break;
    case ActionTypes.AUTHENTICATION_CLEAR_ERROR:
      authenticationStore._clearError();
      break;
    default:
      return;
  }
});

export default authenticationStore;
