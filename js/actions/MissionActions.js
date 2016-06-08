import ActionTypes from '../constants/ActionTypes';
import AppDispatcher from '../dispatcher/AppDispatcher';
import MissionLoader from '../data/MissionLoader';

export default class MissionActions {
  static loadMissions(latitude, longitude) {
    MissionLoader.getMissions(latitude, longitude, (missions) => {
      AppDispatcher.dispatch({
        actionType: ActionTypes.MISSIONS_LOAD,
        data: missions,
      });
    });
  }

  static solveMission(mission, message, isUnsolvable) {
    MissionLoader.postMission(
      mission,
      message,
      isUnsolvable,
      (taskReward) => {
        AppDispatcher.dispatch({
          actionType: ActionTypes.MISSION_PUT,
          data: taskReward,
        });
      },
      null
    );
  }
}
