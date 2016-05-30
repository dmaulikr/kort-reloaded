import ActionTypes from '../constants/ActionTypes';
import AppDispatcher from '../dispatcher/AppDispatcher';
import Store from './Store';

class PromotionStore extends Store {
  constructor() {
    super();
    this._promotions = null;
  }

  getAll() {
    return this._promotions;
  }

  _updatePromotions(promotions) {
    this._promotions = promotions;
    super.emitChange();
  }
}

const promotionStore = new PromotionStore();

promotionStore.dispatchToken = AppDispatcher.register((action) => {
  switch (action.actionType) {
    case ActionTypes.PROMOTIONS_LOAD:
      promotionStore._updatePromotions(action.data);
      break;
    default:
      return;
  }
});
