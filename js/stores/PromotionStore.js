import ActionTypes from '../constants/ActionTypes';
import AppDispatcher from '../dispatcher/AppDispatcher';
import PromotionActions from '../actions/PromotionActions';
import Store from './Store';

class PromotionStore extends Store {
  constructor() {
    super();
    this._promotions = null;
    this._initializePromotions();
  }

  _updatePromotions(promotions) {
    this._promotions = promotions;
    super.emitChange();
  }

  _initializePromotions() {
    PromotionActions.loadPromotions();
  }

  getAllPromotions() {
    return this._promotions;
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

export default promotionStore;
