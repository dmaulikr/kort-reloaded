export default class Statistics {
  constructor(solvedMissions, validatedSolvedMissions, unsolvableMissions, acceptedSolvedMissions,
      openSolvedMissions, solvedValidations, validationCount, validValidationCount,
      invalidValidationCount, userCount, activeUserCount, osmUserCount, googleUserCount,
      fbUserCount, badgeCount, firstPlaceBadgeCount, secondPlaceBadgeCount, thirdPlaceBadgeCount,
      hundredMissionsBadgeCount, fiftyMissionsBadgeCount, tenMissionsBadgeCount,
      thousandValidationsBadgeCount, hundredValidationsBadgeCount, tenValidationsBadgeCount,
      firstMissionBadgeCount, firstValidationBadgeCount) {
    this.solvedMissions = solvedMissions;
    this.validatedSolvedMissions = validatedSolvedMissions;
    this.unsolvableMissions = unsolvableMissions;
    this.acceptedSolvedMissions = acceptedSolvedMissions;
    this.openSolvedMissions = openSolvedMissions;
    this.solvedValidations = solvedValidations;
    this.validationCount = validationCount;
    this.validValidationCount = validValidationCount;
    this.invalidValidationCount = invalidValidationCount;
    this.userCount = userCount;
    this.activeUserCount = activeUserCount;
    this.osmUserCount = osmUserCount;
    this.googleUserCount = googleUserCount;
    this.fbUserCount = fbUserCount;
    this.badgeCount = badgeCount;
    this.firstPlaceBadgeCount = firstPlaceBadgeCount;
    this.secondPlaceBadgeCount = secondPlaceBadgeCount;
    this.thirdPlaceBadgeCount = thirdPlaceBadgeCount;
    this.hundredMissionsBadgeCount = hundredMissionsBadgeCount;
    this.fiftyMissionsBadgeCount = fiftyMissionsBadgeCount;
    this.tenMissionsBadgeCount = tenMissionsBadgeCount;
    this.thousandValidationsBadgeCount = thousandValidationsBadgeCount;
    this.hundredValidationsBadgeCount = hundredValidationsBadgeCount;
    this.tenValidationsBadgeCount = tenValidationsBadgeCount;
    this.firstMissionBadgeCount = firstMissionBadgeCount;
    this.firstValidationBadgeCount = firstValidationBadgeCount;
  }
}
