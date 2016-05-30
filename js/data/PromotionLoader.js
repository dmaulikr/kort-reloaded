import Config from '../constants/Config';
import DataLoader from './DataLoader';
import Promotion from '../dto/Promotion';

const promotionRestPath = Config.PROMOTION_PATH;

class PromotionLoader extends DataLoader {
  static _initPromotions(rawPromotions) {
    const promotions = [];
    rawPromotions.return.forEach((rawPromotion) => {
      promotions.push(
        new Promotion(rawPromotion.id, rawPromotion.title, rawPromotion.startdate,
          rawPromotion.enddate
        )
      );
    }, this);
  }

  static getPromotions(onSuccess, onError) {
    const requestUrl = super.createRequestUrl(promotionRestPath, null, null);
    super.makeGetRequest(
      requestUrl,
      true,
      (rawPromotions) => onSuccess(PromotionLoader._initPromotions(rawPromotions)),
      onError
    );
  }
}
