import ActionTypes from '../constants/ActionTypes';
import AppDispatcher from '../dispatcher/AppDispatcher';
import loginStore from './LoginStore';
import Store from './Store';

class ValidationStore extends Store {
  constructor() {
    super();
    this._validations = null;
  }

  _getValidationsWithoutOwnFixes(validations) {
    const ownUserId = loginStore.getUserCredential().userId;
    const cleanValidations = [];
    validations.forEach((validation) => {
      if (validation.fixUserId === ownUserId) {
        cleanValidations.push(validation);
      }
    });

    return cleanValidations;
  }

  _setValidations(validations) {
    this._validations = this._getValidationsWithoutOwnFixes(validations);
    super.emitChange();
  }

  getAll() {
    return this._validations;
  }
}

const validationStore = new ValidationStore();

validationStore.dispatchToken = AppDispatcher.register((action) => {
  switch (action.actionType) {
    case ActionTypes.VALIDATIONS_LOAD:
      validationStore._setValidations(action.data);
      break;
    default:
      return;
  }
});

export default validationStore;
