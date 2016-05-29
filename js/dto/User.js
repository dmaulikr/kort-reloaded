export default class User {
  constructor(id, name, userName, oauthUserId, oauthProvider, token, fixCount, voteCount, koinCount,
      secret, picUrl, loggedIn) {
    this.id = id;
    this.name = name;
    this.userName = userName;
    this.oauthUserId = oauthUserId;
    this.oauthProvider = oauthProvider;
    this.token = token;
    this.fixCount = fixCount;
    this.voteCount = voteCount;
    this.koinCount = koinCount;
    this.secret = secret;
    this.picUrl = picUrl;
    this.loggedIn = loggedIn;
  }
}
