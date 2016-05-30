import ActionTypes from '../constants/ActionTypes';
import AppDispatcher from '../dispatcher/AppDispatcher';
import HighscoreLoader from '../data/HighscoreLoader';

export default class HighscoreActions {
  static _dispatchHighScoreLoaded(highscoreEntries) {
    AppDispatcher.dispatch({
      actionType: ActionTypes.HIGHSCORE_LOAD,
      data: highscoreEntries,
    });
  }

  static loadAbsoluteHighscore(limit, page) {
    HighscoreLoader.getAbsoluteHighscore(
      limit,
      page,
      HighscoreActions._dispatchHighScoreLoaded,
      null
    );
  }

  static loadRelativeHighscore(limit, page) {
    HighscoreLoader.getAbsoluteHighscore(
      limit,
      page,
      HighscoreActions._dispatchHighScoreLoaded,
      null
    );
  }
}
