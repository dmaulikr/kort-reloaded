import DataLoader from './DataLoader';
import Validation from '../dto/Validation';

const GET_VALIDATIONS_REST_PATH = '/validation/position';

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
  static getValidations(latitude, longitude, limit, radius, onSuccess) {
    const parameters = [];
    if (limit !== null) parameters.push(`limit=${limit}`);
    if (radius !== null) parameters.push(`radius=${radius}`);
    const requestUrl = super.createRequestUrl(
      GET_VALIDATIONS_REST_PATH, [latitude, longitude], parameters);
    super.makeAuthenticatedRequest(requestUrl, onSuccess, null, _initValidations);
  }
}

export default ValidationLoader;
