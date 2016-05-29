import ActionTypes from '../constants/ActionTypes';
import AppDispatcher from '../dispatcher/AppDispatcher';
import Store from './Store';

class ValidationStore extends Store {
  constructor() {
    super();
    this._validations = null;
  }

  getAll() {
    return this._validations;
  }

  _updateValidations(validations) {
    this._validations = validations;
    super.emitChange();
  }
}

const validationStore = new ValidationStore();

validationStore.dispatchToken = AppDispatcher.register((action) => {
  switch (action.actionType) {
    case ActionTypes.VALIDATIONS_LOAD:
      validationStore._updateValidations(action.data);
      break;
    default:
      return;
  }
});

export default validationStore;
