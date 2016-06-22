import ActionTypes from '../constants/ActionTypes';
import AppDispatcher from '../dispatcher/AppDispatcher';
import ValidationLoader from '../data/ValidationLoader';

export default class ValidationActions {
  static solveValidation(validation, valid) {
    ValidationLoader.postValidation(validation, valid, (taskReward) => {
      AppDispatcher.dispatch({
        actionType: ActionTypes.VALIDATION_PUT,
        data: taskReward,
      });
    });
  }
}
