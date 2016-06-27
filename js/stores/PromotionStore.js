import ActionTypes from '../constants/ActionTypes';
import AppDispatcher from '../dispatcher/AppDispatcher';
import Error from '../dto/Error';
import Store from './Store';

class PromotionStore extends Store {
  constructor() {
    super();
    this._promotions = null;
    this._error = null;
  }

  _updatePromotions(promotions) {
    this._promotions = promotions;
    super.emitChange();
  }

  _raiseError() {
    this._error = new Error(I18n.t('error_title_default'), I18n.t('error_message_default'));
    super.emitChange();
  }

  getAllPromotions() {
    return this._promotions;
  }

  getError() {
    const error = this._error;
    this._error = null;
    return error;
  }
}

const promotionStore = new PromotionStore();

promotionStore.dispatchToken = AppDispatcher.register((action) => {
  switch (action.actionType) {
    case ActionTypes.PROMOTIONS_LOAD:
      promotionStore._updatePromotions(action.data);
      break;
    case ActionTypes.PROMOTIONS_ERROR_LOAD:
      promotionStore._raiseError();
      break;
    default:
      return;
  }
});

export default promotionStore;
