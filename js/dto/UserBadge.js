export default class UserBadge {

  /**
   * Represents a badge.
   * @constructor
   * @param {number} id The id of the badge.
   * @param {string} name The name of the badge.
   * @param {string} title The title of the badge.
   * @param {string} description The description of the badge.
   * @param {string} color The color of the badge.
   * @param {string} sorting The rank of the badge.
   * @param {string} won The indicator if the badge was received already.
   * @param {string} createDate The date of when the badge was received.
   */
  constructor(id, name, title, description, color, sorting, won, createDate) {
    this.id = id;
    this.name = name;
    this.title = title;
    this.description = description;
    this.color = color;
    this.sorting = sorting;
    this.won = won;
    this.createDate = createDate;

    this.pictureFile = null;
    this._setPictureFile();
  }

  /**
   * Sets the picture file path of the corresponding badge that was won.
   * @returns {void}
   */
  _setPictureFile() {
    if (!this.won) {
      this.pictureFile = require('../assets/img/locked.png');
      return;
    }
  }
}
