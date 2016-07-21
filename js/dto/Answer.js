export default class Answer {

  /**
   * Represents an answer.
   * @constructor
   * @param {number} id The id of an answer.
   * @param {number} value The Koin value of an answer.
   * @param {string} title The title of an answer.
   * @param {string} sorting
   * @param {string} type The type of the answer. input or text.
   */
  constructor(id, value, title, sorting, type) {
    this.id = id;
    this.value = value;
    this.title = title;
    this.sorting = sorting;
    this.type = type;
  }
}
