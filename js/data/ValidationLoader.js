import Config from '../constants/Config';
import DataLoader from './DataLoader';
import Validation from '../dto/Validation';

const validationsGetRestPath = Config.VALIDATIONS_GET_PATH;
const limit = Config.VALIDATIONS_LIMIT;
const radius = Config.RADIUS;

function _initValidations(rawValidations) {
  const validations = [];
  rawValidations.forEach((validation) => {
    validations.push(new Validation(
      validation.id,
      validation.type,
      validation.title,
      validation.bug_question,
      validation.view_type,
      validation.latitude,
      validation.longitude,
      validation.vote_koin_count,
      validation.promo_id,
      validation.extra_coins,
      validation.fix_user_id,
      validation.fixmessage)
    );
  }, this);

  return validations;
}

class ValidationLoader extends DataLoader {
  static getValidations(latitude, longitude, onSuccess) {
    const parameters = [];
    if (limit !== null) parameters.push(`limit=${limit}`);
    if (radius !== null) parameters.push(`radius=${radius}`);
    const requestUrl = super.createRequestUrl(
      validationsGetRestPath, [latitude, longitude], parameters);
    super.makeAuthenticatedRequest(requestUrl, onSuccess, null, _initValidations);
  }
}

export default ValidationLoader;
