import Task from './Task';

export default class Mission extends Task {
  constructor(id, type, title, question, viewType, latitude, longitude, fixKoinCount, promoId,
      promoExtraKoins, answerPlaceholder) {
    super(id, type, title, question, viewType, latitude, longitude, fixKoinCount, promoId,
        promoExtraKoins);
    this.answerPlaceholder = answerPlaceholder;
  }
}
