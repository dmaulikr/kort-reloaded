import Config from '../constants/Config';
import DataLoader from './DataLoader';
import HighscoreEntry from '../dto/HighscoreEntry';

const absoluteHighscoreRestPath = Config.HIGHSCORE_ABSOLUTE_PATH;
const relativeHighscoreRestPath = Config.HIGHSCORE_RELATIVE_PATH;

export default class HighscoreLoader extends DataLoader {
  static _initHighscoreEntries(rawHighscoreEntries, hasReturn) {
    let rawHighscoreEntriesArray = rawHighscoreEntries;
    if (hasReturn) rawHighscoreEntriesArray = rawHighscoreEntries.return;

    const highscoreEntries = [];
    rawHighscoreEntriesArray.forEach((rawHighScoreEntry) => {
      highscoreEntries.push(new HighscoreEntry(rawHighScoreEntry.user_id,
        rawHighScoreEntry.username, rawHighScoreEntry.pic_url, rawHighScoreEntry.koin_count,
        rawHighScoreEntry.fix_count, rawHighScoreEntry.vote_count, rawHighScoreEntry.ranking,
        rawHighScoreEntry.rownumber, rawHighScoreEntry.you
      ));
    });

    return highscoreEntries;
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
        onSuccess(HighscoreLoader._initHighscoreEntries(rawHighscoreEntries, false));
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
        onSuccess(HighscoreLoader._initHighscoreEntries(rawHighscoreEntries, true));
      },
      onError
    );
  }
}
