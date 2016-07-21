export default class TaskReward {

  /**
   * Represents a task reward.
   * @constructor
   * @param {Object} badges The badges that were won.
   * @param {number} receivedKoins The koins that were won.
   * @param {number} newKoinsTotal The new total amount of Koins the user has.
   */
  constructor(badges, receivedKoins, newKoinsTotal) {
    this.badges = badges;
    this.receivedKoins = receivedKoins;
    this.newKoinsTotal = newKoinsTotal;
  }
}
