import ActionTypes from '../constants/ActionTypes';
import AppDispatcher from '../dispatcher/AppDispatcher';
import Store from './Store';

class ValidationStore extends Store {
  constructor() {
    super();
    this._validations = null;
  }

  _setValidations(validations) {
    this._validations = validations;
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
