import Task from './Task';

export default class Validation extends Task {

  /**
   * Represents a task.
   * @constructor
   * @param {number} id The id of a task.
   * @param {string} type The type of a task.
   * @param {string} title The title of a task.
   * @param {string} question The question of a task.
   * @param {string} viewType The type of the rendered view. input or text.
   * @param {number} latitude The latitude of the tasks coordinates.
   * @param {number} longitude The longitude of the tasks coordinates.
   * @param {number} fixKoinCount The provided Koins for solving this task.
   * @param {number} promoId The id of the promotion.
   * @param {number} promoExtraKoins The amount of extra coins due to the promotion.
   * @param {number} fixUserId The user id of the user that provided the fix.
   * @param {number} fixMessage The message of the fix.
   * @param {boolean} unsolvable The indicator if the task is unsolvable.
   * @param {number} upRatings The amount of up-votes of the task.
   * @param {number} downRatings The amount of donw-votes of the task.
   * @param {string} requiredVotes
   * @param {number} osmId The OpenStreetMap id of the task.
   * @param {string} osmType The OpenStreetMap type of the task.
   * @param {string} geom The geometry object of the task.
   */
  constructor(id, type, title, question, viewType, latitude, longitude, fixKoinCount, promoId,
      promoExtraKoins, fixUserId, fixMessage, unsolvable, upRatings, downRatings, requiredVotes,
      osmId, osmType, geom, txt1, txt2, txt3, txt4, txt5) {
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
