import ActionTypes from '../constants/ActionTypes';
import AppDispatcher from '../dispatcher/AppDispatcher';
import Config from '../constants/Config';
import MissionLoader from '../data/MissionLoader';

export default class MissionActions {
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
      (error) => {
        AppDispatcher.dispatch({
          actionType: ActionTypes.ERROR_RAISE,
          data: error,
          type: Config.ERROR_POST_MISSION,
        });
      }
    );
  }
}
