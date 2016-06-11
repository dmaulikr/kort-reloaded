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

    this.annotationImage = null;
    this._setAnnotationImage();
  }

  _setAnnotationImage() {
    switch (this.type) {
      case 'motorway_ref':
        this.annotationImage = 'motorway_ref_mission';
        break;
      case 'religion':
        this.annotationImage = 'religion_mission';
        break;
      case 'poi_name':
        this.annotationImage = 'poi_name_mission';
        break;
      case 'missing_maxspeed':
        this.annotationImage = 'missing_maxspeed_mission';
        break;
      case 'language_unknown':
        this.annotationImage = 'language_unknown_mission';
        break;
      case 'missing_track_type':
        this.annotationImage = 'type_of_track_unknown_mission';
        break;
      case 'missing_cuisine':
        this.annotationImage = 'missing_cuisine_mission';
        break;
      default:
        this.annotationImage = 'undefined_mission';
    }
  }
}
