export default class User {
  constructor(id, name, userName, oauthUserId, oauthProvider, token, missionCount, validationCount,
      koinCount, secret, picUrl, loggedIn) {
    this.id = id;
    this.name = name;
    this.userName = userName;
    this.oauthUserId = oauthUserId;
    this.oauthProvider = oauthProvider;
    this.token = token;
    this.missionCount = missionCount;
    this.validationCount = validationCount;
    this.fixCount = missionCount + validationCount;
    this.koinCount = koinCount;
    this.secret = secret;
    this.picUrl = picUrl;
    this.loggedIn = loggedIn;
  }
}
