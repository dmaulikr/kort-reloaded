export default class HighscoreEntry {
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
