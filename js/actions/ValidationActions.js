import ActionTypes from '../constants/ActionTypes';
import AppDispatcher from '../dispatcher/AppDispatcher';
import ValidationLoader from '../data/ValidationLoader';

export default class ValidationActions {
  static loadValidations(latitude, longitude) {
    ValidationLoader.getValidations(latitude, longitude, (validations) => {
      AppDispatcher.dispatch({
        actionType: ActionTypes.VALIDATIONS_LOAD,
        data: validations,
      });
    });
  }
}
