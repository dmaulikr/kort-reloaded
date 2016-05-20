import ActionTypes from '../constants/ActionTypes';
import AppDispatcher from '../dispatcher/AppDispatcher';
import ValidationLoader from '../data/ValidationLoader';

export default class ValidationActions {
  static loadValidations(latitude, longitude, limit, radius) {
    ValidationLoader.getValidations(latitude, longitude, limit, radius, (validations) => {
      AppDispatcher.dispatch({
        actionType: ActionTypes.VALIDATIONS_LOAD,
        data: validations,
      });
    });
  }
}
