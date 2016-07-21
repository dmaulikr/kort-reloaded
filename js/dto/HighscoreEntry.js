export default class HighscoreEntry {

  /**
   * Represents a highscore entry.
   * @constructor
   * @param {number} userId The userId of the user.
   * @param {number} userName The name of the user.
   * @param {string} picUrl The pic url of the users profile picture.
   * @param {} koinCount The amount of Koins the user has.
   * @param {string} missionCount The amount of solved missions of a user.
   * @param {string} validationCount The amount of solved validations of a user.
   * @param {string} ranking The user rank.
   * @param {string} rowNumber
   * @param {boolean} isOwnEntry Defines the entry for the user that is logged in.
   */
  constructor(userId, userName, picUrl, koinCount, missionCount, validationCount, ranking,
      rowNumber, isOwnEntry) {
    this.userId = userId;
    this.userName = userName;
    this.picUrl = picUrl;
    this.koinCount = koinCount;
    this.missionCount = missionCount;
    this.validationCount = validationCount;
    this.fixCount = parseInt(missionCount, 10) + parseInt(validationCount, 10);
    this.ranking = ranking;
    this.rowNumber = rowNumber;
    this.isOwnEntry = isOwnEntry;
  }
}
