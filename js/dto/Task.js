class Task {
  constructor(id, type, title, question, viewType, latitude, longitude, fixKoinCount, promoId,
      promoExtraKoins) {
    this.id = id;
    this.type = type;
    this.title = title;
    this.question = question;
    this.viewType = viewType;
    this.latitude = latitude;
    this.longitude = longitude;
    this.fixKoinCount = fixKoinCount;
    this.promoId = promoId;
    this.promoExtraKoins = promoExtraKoins;
  }
}

export default Task;
