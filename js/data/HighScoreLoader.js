import Config from '../constants/Config';
import DataLoader from './DataLoader';
import HighscoreEntry from '../dto/HighscoreEntry';

const absoluteHighscoreRestPath = Config.HIGHSCORE_ABSOLUTE_PATH;
const relativeHighscoreRestPath = Config.HIGHSCORE_RELATIVE_PATH;

export default class HighscoreLoader extends DataLoader {
  static initHighscoreEntries(rawHighscoreEntries) {
    const highscoreEntries = [];
    rawHighscoreEntries.forEach((rawHighScoreEntry) => {
      highscoreEntries.push(new HighscoreEntry(
        rawHighScoreEntry.user_id,
        rawHighScoreEntry.username,
        rawHighScoreEntry.pic_url,
        rawHighScoreEntry.koin_count,
        rawHighScoreEntry.fix_count,
        rawHighScoreEntry.vote_count,
        rawHighScoreEntry.ranking,
        rawHighScoreEntry.rownumber,
        rawHighScoreEntry.you
      ));
    }, this);
  }

  static getAbsoluteHighscore(limit, page, onSuccess, onError) {
    const parameters = [];
    if (limit !== null) parameters.push(`limit=${limit}`);
    if (page !== null) parameters.push(`page=${page}`);
    const requestUrl = super.createRequestUrl(absoluteHighscoreRestPath, null, parameters);
    super.makeGetRequest(
      requestUrl,
      true,
      (rawHighscoreEntries) => {
        onSuccess(HighscoreLoader._initHighscoreEntries(rawHighscoreEntries));
      },
      onError
    );
  }

  static getRelativeHighscore(limit, page, onSuccess, onError) {
    const parameters = [];
    if (limit !== null) parameters.push(`limit=${limit}`);
    if (page !== null) parameters.push(`page=${page}`);
    const requestUrl = super.createRequestUrl(relativeHighscoreRestPath, null, parameters);
    super.makeGetRequest(
      requestUrl,
      true,
      (rawHighscoreEntries) => {
        onSuccess(HighscoreLoader._initHighscoreEntries(rawHighscoreEntries));
      },
      onError
    );
  }
}
