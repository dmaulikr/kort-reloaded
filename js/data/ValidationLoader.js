import Config from '../constants/Config';
import DataLoader from './DataLoader';
import Validation from '../dto/Validation';

const validationsGetRestPath = Config.VALIDATIONS_GET_PATH;
const limit = Config.VALIDATIONS_LIMIT;
const radius = Config.RADIUS;

class ValidationLoader extends DataLoader {
  static _initValidations(rawValidations) {
    const validations = [];
    rawValidations.return.forEach((validation) => {
      validations.push(
        new Validation(validation.id, validation.type, validation.title, validation.bug_question,
          validation.view_type, validation.latitude, validation.longitude,
          validation.vote_koin_count, validation.promo_id, validation.extra_coins,
          validation.fix_user_id, validation.fixmessage, validation.upratings,
          validation.downratings, validation.required_votes, validation.osm_id, validation.osm_type,
          validation.geom, validation.txt1, validation.txt2, validation.txt3, validation.txt4,
          validation.txt5)
      );
    }, this);

    return validations;
  }

  static getValidations(latitude, longitude, onSuccess) {
    const parameters = [];
    if (limit !== null) parameters.push(`limit=${limit}`);
    if (radius !== null) parameters.push(`radius=${radius}`);
    const requestUrl = super.createRequestUrl(
      validationsGetRestPath, [latitude, longitude], parameters);
    super.makeGetRequest(
      requestUrl,
      true,
      (rawValidations) => onSuccess(ValidationLoader._initValidations(rawValidations)),
      null
    );
  }
}

export default ValidationLoader;
