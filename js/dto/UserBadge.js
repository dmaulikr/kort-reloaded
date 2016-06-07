export default class UserBadge {
  constructor(id, name, title, description, color, sorting, won, createDate) {
    this.id = id;
    this.name = name;
    this.title = title;
    this.description = description;
    this.color = color;
    this.sorting = sorting;
    this.won = won;
    this.createDate = createDate;
    this.pictureFile = this._setPictureFile();
  }

  _setPictureFile() {
    if (!this.won) {
      this.pictureFile = require('../assets/img/locked.png');
      return;
    }
    switch (this.name) {
      case 'highscore_place_1':
        this.pictureFile = require('../assets/img/highscore_place_1.png');
        break;
      default:
        break;
    }
  }
}
