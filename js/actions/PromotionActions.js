import ActionTypes from '../constants/ActionTypes';
import AppDispatcher from '../dispatcher/AppDispatcher';
import Config from '../constants/Config';
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
          actionType: ActionTypes.ERROR_RAISE,
          data: error,
          type: Config.ERROR_GET_PROMOTIONS,
        });
      }
    );
  }
}
