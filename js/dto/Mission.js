import Task from './Task';

export default class Mission extends Task {
  constructor(id, type, title, question, viewType, latitude, longitude, fixKoinCount, promoId,
      promoExtraKoins, answerPlaceholder, osmId, osmType, schema, geom, txt1, txt2, txt3, txt4,
      txt5) {
    super(id, type, title, question, viewType, latitude, longitude, fixKoinCount, promoId,
        promoExtraKoins, osmId, osmType, geom, txt1, txt2, txt3, txt4, txt5);

    this.answerPlaceholder = answerPlaceholder;
    this.schema = schema;
  }
}
