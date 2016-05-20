import Task from './Task';

class Validation extends Task {
  constructor(id, type, title, question, viewType, latitude, longitude, fixKoinCount, promoId,
      promoExtraKoins, fixUserId, fixMessage) {
    super(id, type, title, question, viewType, latitude, longitude, fixKoinCount, promoId,
      promoExtraKoins);
    this.fixUserId = fixUserId;
    this.fixMessage = fixMessage;
  }
}

export default Validation;
