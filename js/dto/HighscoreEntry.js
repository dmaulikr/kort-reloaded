export default class HighscoreEntry {
  constructor(userId, userName, picUrl, koinCount, missionCount, validationCount, ranking,
      rowNumber, isLoggedInUsersEntry) {
    this.userId = userId;
    this.userName = userName;
    this.picUrl = picUrl;
    this.koinCount = koinCount;
    this.missionCount = missionCount;
    this.validationCount = validationCount;
    this.fixCount = missionCount + validationCount;
    this.ranking = ranking;
    this.rowNumber = rowNumber;
    this.isLoggedInUsersEntry = isLoggedInUsersEntry;
  }
}
