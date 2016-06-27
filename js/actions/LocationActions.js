import ActionTypes from '../constants/ActionTypes';
import AppDispatcher from '../dispatcher/AppDispatcher';

export default class LocationActions {
  static startLocating() {
    AppDispatcher.dispatch({ actionType: ActionTypes.LOCATION_START_LOCATING });
  }

  static stopLocating() {
    AppDispatcher.dispatch({ actionType: ActionTypes.LOCATION_STOP_LOCATING });
  }

  static clearError() {
    AppDispatcher.dispatch({ actionType: ActionTypes.LOCATION_CLEAR_ERROR });
  }
}
