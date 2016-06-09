import Task from './Task';

export default class Validation extends Task {
  constructor(id, type, title, question, viewType, latitude, longitude, fixKoinCount, promoId,
      promoExtraKoins, fixUserId, fixMessage, unsolvable, upRatings, downRatings, requiredVotes, osmId, osmType,
      geom, txt1, txt2, txt3, txt4, txt5) {
    super(id, type, title, question, viewType, latitude, longitude, fixKoinCount, promoId,
      promoExtraKoins, osmId, osmType, geom, txt1, txt2, txt3, txt4, txt5);

    this.fixUserId = fixUserId;
    this.fixMessage = fixMessage;
    this.unsolvable = unsolvable;
    this.upRatings = upRatings;
    this.downRatings = downRatings;
    this.requiredVotes = requiredVotes;
  }
}
