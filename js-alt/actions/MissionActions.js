import ActionTypes from '../constants/ActionTypes';
import AppDispatcher from '../dispatcher/AppDispatcher';
import MissionLoader from '../data/MissionLoader';

export default class MissionActions {
  static loadMissions(latitude, longitude, limit, radius) {
    MissionLoader.getMissions(latitude, longitude, limit, radius, (missions) => {
      AppDispatcher.dispatch({
        actionType: ActionTypes.MISSIONS_LOAD,
        data: missions,
      });
    });
  }
}
