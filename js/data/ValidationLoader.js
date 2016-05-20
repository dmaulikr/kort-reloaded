import createRequestUrl from '../utils/ApiUrlBuilder';
import Validation from '../dto/Validation';

const GET_VALIDATIONS_REST_PATH = '/validation/position';

function initValidations(rawValidations) {
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

class ValidationLoader {
  static getValidations(latitude, longitude, limit, radius, onSuccess) {
    const parameters = [];
    if (limit !== null) parameters.push(`limit=${limit}`);
    if (radius !== null) parameters.push(`radius=${radius}`);
    const requestUrl = createRequestUrl(
      GET_VALIDATIONS_REST_PATH, [latitude, longitude], parameters);
    fetch(requestUrl)
      .then((response) => response.json())
      .then((responseData) => {
        onSuccess(responseData.return);
      })
      .done();
  }
}

export default ValidationLoader;
