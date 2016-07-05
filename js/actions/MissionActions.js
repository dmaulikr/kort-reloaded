import ActionTypes from '../constants/ActionTypes';
import AppDispatcher from '../dispatcher/AppDispatcher';
import MissionLoader from '../data/MissionLoader';

export default class MissionActions {
  static solveMission(mission, message, isUnsolvable) {
    MissionLoader.postMission(
      mission,
      message,
      isUnsolvable,
      (taskReward) => {
        AppDispatcher.dispatch({
          actionType: ActionTypes.MISSION_SEND,
          data: taskReward,
        });
      },
      (error) => {
        AppDispatcher.dispatch({
          actionType: ActionTypes.MISSION_ERROR_SEND,
          data: error,
        });
      }
    );
  }
}
