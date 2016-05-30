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
    this.pictureFile = this._getPictureFile(name);
  }

  _getPictureFile(badgeName) {
    return null;
  }
}
