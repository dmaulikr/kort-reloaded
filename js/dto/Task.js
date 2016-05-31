export default class Task {
  constructor(id, type, title, question, viewType, latitude, longitude, fixKoinCount, promoId,
      promoExtraKoins, osmId, osmType, geom, txt1, txt2, txt3, txt4, txt5) {
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
    this.osmId = osmId;
    this.osmType = osmType;
    this.geom = geom;
    this.txt1 = txt1;
    this.txt2 = txt2;
    this.txt3 = txt3;
    this.txt4 = txt4;
    this.txt5 = txt5;
  }
}
