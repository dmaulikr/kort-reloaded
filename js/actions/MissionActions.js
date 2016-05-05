import ActionTypes from '../constants/ActionTypes';
import AppDispatcher from '../dispatcher/AppDispatcher';

export default class MissionActions {
  static loadMissions(latitude, longitude, limit, radius) {
    AppDispatcher.dispatch({
      actionType: ActionTypes.MISSIONS_LOAD,
      latitude, longitude, limit, radius,
    });
  }
}
