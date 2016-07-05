import ActionTypes from '../constants/ActionTypes';
import AppDispatcher from '../dispatcher/AppDispatcher';
import PromotionLoader from '../data/PromotionLoader';

export default class PromotionActions {
  static loadPromotions() {
    PromotionLoader.getPromotions(
      (promotions) => {
        AppDispatcher.dispatch({
          actionType: ActionTypes.PROMOTIONS_LOAD,
          data: promotions,
        });
      },
      (error) => {
        AppDispatcher.dispatch({
          actionType: ActionTypes.PROMOTIONS_ERROR_LOAD,
          data: error,
        });
      }
    );
  }

  static clearError() {
    AppDispatcher.dispatch({ actionType: ActionTypes.PROMOTIONS_CLEAR_ERROR });
  }
}
