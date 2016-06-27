import ActionTypes from '../constants/ActionTypes';
import AppDispatcher from '../dispatcher/AppDispatcher';
import Config from '../constants/Config';
import ValidationLoader from '../data/ValidationLoader';

export default class ValidationActions {
  static solveValidation(validation, valid) {
    ValidationLoader.postValidation(
      validation,
      valid,
      (taskReward) => {
        AppDispatcher.dispatch({
          actionType: ActionTypes.VALIDATION_SEND,
          data: taskReward,
        });
      },
      (error) => {
        AppDispatcher.dispatch({
          actionType: ActionTypes.VALIDATION_ERROR_SEND,
          data: error,
        });
      }
    );
  }
}
