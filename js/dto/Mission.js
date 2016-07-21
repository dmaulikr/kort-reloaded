import Task from './Task';

export default class Mission extends Task {

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
   * @param {number} answerPlaceholder The placeholder for the answer field.
   * @param {number} osmId The OpenStreetMap id of the task.
   * @param {string} osmType The OpenStreetMap type of the task.
   * @param {string} schema The schema of the task.
   * @param {string} geom The geometry object of the task.
   */
  constructor(id, type, title, question, viewType, latitude, longitude, fixKoinCount, promoId,
      promoExtraKoins, answerPlaceholder, osmId, osmType, schema, geom, txt1, txt2, txt3, txt4,
      txt5) {
    super(id, type, title, question, viewType, latitude, longitude, fixKoinCount, promoId,
        promoExtraKoins, osmId, osmType, geom, txt1, txt2, txt3, txt4, txt5);

    this.answerPlaceholder = answerPlaceholder;
    this.schema = schema;
  }
}
