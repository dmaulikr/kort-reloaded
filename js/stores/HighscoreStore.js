import ActionTypes from '../constants/ActionTypes';
import AppDispatcher from '../dispatcher/AppDispatcher';
import Error from '../dto/Error';
import Store from './Store';

class HighscoreStore extends Store {
  constructor() {
    super();
    this._highscore = null;
    this._error = null;
  }

  _setHighscore(highscore) {
    this._highscore = highscore;
    super.emitChange();
  }

  _raiseError() {
    this._error = new Error(I18n.t('error_title_default'), I18n.t('error_message_default'));
    super.emitChange();
  }

  getHighscore() {
    return this._highscore;
  }

  getError() {
    const error = this._error;
    this._error = null;
    return error;
  }
}

const highscoreStore = new HighscoreStore();

highscoreStore.dispatchToken = AppDispatcher.register((action) => {
  switch (action.actionType) {
    case ActionTypes.HIGHSCORE_LOAD:
      highscoreStore._setHighscore(action.data);
      break;
    case ActionTypes.HIGHSCORE_ERROR_LOAD:
      highscoreStore._raiseError();
      break;
    default:
      return;
  }
});

export default highscoreStore;
