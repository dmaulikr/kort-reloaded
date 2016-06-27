import ActionTypes from '../constants/ActionTypes';
import AppDispatcher from '../dispatcher/AppDispatcher';
import Config from '../constants/Config';

export default class LocationActions {
  static startLocating() {
    AppDispatcher.dispatch({ actionType: ActionTypes.LOCATION_START_LOCATING });
  }

  static stopLocating() {
    AppDispatcher.dispatch({ actionType: ActionTypes.LOCATION_STOP_LOCATING });
  }

  static raiseLocationDeniedError() {
    AppDispatcher.dispatch({
      actionType: ActionTypes.ERROR_RAISE,
      type: Config.ERROR_LOCATION_DENIED,
    });
  }

  static raisePositionUnavailableError() {
    AppDispatcher.dispatch({
      actionType: ActionTypes.ERROR_RAISE,
      type: Config.ERROR_POSITION_UNAVAILABLE,
    });
  }
}
