import ActionTypes from '../constants/ActionTypes';
import AppDispatcher from '../dispatcher/AppDispatcher';

export default class ErrorActions {
  static clearError() {
    AppDispatcher.dispatch({ actionType: ActionTypes.ERROR_CLEAR });
  }
}
