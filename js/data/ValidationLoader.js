import Config from '../constants/Config';

import DataLoader from './DataLoader';

import TaskFixUpdate from '../dto/TaskFixUpdate';
import UserBadge from '../dto/UserBadge';
import Validation from '../dto/Validation';

const validationsGetRestPath = Config.VALIDATIONS_GET_PATH;
const validationPostRestPath = Config.VALIDATION_POST_PATH;

const limit = Config.VALIDATIONS_LIMIT;
const radius = Config.RADIUS;

export default class ValidationLoader extends DataLoader {
  static _initValidations(rawValidations) {
    const validations = [];
    rawValidations.return.forEach((rawValidation) => {
      validations.push(
        new Validation(rawValidation.id, rawValidation.type, rawValidation.title,
          rawValidation.bug_question, rawValidation.view_type, rawValidation.latitude,
          rawValidation.longitude, rawValidation.vote_koin_count, rawValidation.promo_id,
          rawValidation.extra_coins, rawValidation.fix_user_id, rawValidation.fixmessage,
          rawValidation.upratings, rawValidation.downratings, rawValidation.required_votes,
          rawValidation.osm_id, rawValidation.osm_type, rawValidation.geom, rawValidation.txt1,
          rawValidation.txt2, rawValidation.txt3, rawValidation.txt4, rawValidation.txt5
        )
      );
    }, this);

    return validations;
  }

  static _initJsonValidation(validation, valid) {
    return JSON.stringify({
      id: validation.id,
      fix_id: validation.id,
      user_id: validation.userId,
      valid,
    });
  }

  static _initTaskFixUpdate(rawTaskFixUpdate) {
    const badges = [];
    rawTaskFixUpdate.badges.forEach((rawBadge) => {
      badges.push(new UserBadge(null, rawBadge.name, null, null, null, null, null, null));
    });

    return new TaskFixUpdate(badges, rawTaskFixUpdate.koint_count_new,
      rawTaskFixUpdate.koin_count_total);
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

  static solveValidation(validation, valid, onSuccess, onError) {
    const requestUrl = super.createRequestUrl(validationPostRestPath, null, null);
    super.makePostRequest(
      requestUrl,
      ValidationLoader._initJsonValidation(validation, valid),
      (rawTaskFixUpdate) => onSuccess(ValidationLoader._initTaskFixUpdate(rawTaskFixUpdate)),
      onError
    );
  }
}
