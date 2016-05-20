import ActionTypes from '../constants/ActionTypes';
import AppDispatcher from '../dispatcher/AppDispatcher';
import Store from './Store';

let _validations = [];

class ValidationStore extends Store {

  getAll() {
    return _validations;
  }
}

const validationStore = new ValidationStore();

function updateValidations(validations) {
  // only emit change if validations changed
  // currently depends on the assumption that validations are always retrieved in the same order
  // TODO: make comparison more robust
  if (validations.toString() !== _validations.toString()) {
    _validations = validations;
    validationStore.emitChange();
  }
}

AppDispatcher.register((action) => {
  switch (action.actionType) {
    case ActionTypes.VALIDATIONS_LOAD:
      updateValidations(action.data);
      break;

    default:
      return;
  }
});

export default validationStore;
