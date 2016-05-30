import Config from '../constants/Config';
import DataLoader from './DataLoader';
import Statistics from '../dto/Statistics';

const statisticsRestPath = Config.STATISTICS_PATH;

export default class StatisticsLoader extends DataLoader {
  static _initStatistics(rawStatistics) {
    const rawStatisticsObject = rawStatistics.return;
    return new Statistics(rawStatisticsObject.fix_count, rawStatisticsObject.validated_fix_count,
      rawStatisticsObject.falsepositive_fix_count, rawStatisticsObject.complete_fix_count,
      rawStatisticsObject.incomplete_fix_count, rawStatisticsObject.vote_count,
      rawStatisticsObject.valid_vote_count, rawStatisticsObject.invalid_vote_count,
      rawStatisticsObject.user_count, rawStatisticsObject.active_user_count,
      rawStatisticsObject.osm_user_count, rawStatisticsObject.google_user_count,
      rawStatisticsObject.fb_user_count, rawStatisticsObject.badge_count,
      rawStatisticsObject.first_place_badge_count, rawStatisticsObject.second_place_badge_count,
      rawStatisticsObject.third_place_badge_count, rawStatisticsObject.hundred_missions_badge_count,
      rawStatisticsObject.fifty_missions_badge_count, rawStatisticsObject.ten_missions_badge_count,
      rawStatisticsObject.thousand_checks_badge_count,
      rawStatisticsObject.hundred_checks_badge_count, rawStatisticsObject.ten_checks_badge_count,
      rawStatisticsObject.first_mission_badge_count, rawStatisticsObject.first_check_badge_count);
  }

  static getStatistics(onSuccess, onError) {
    const requestUrl = super.createRequestUrl(statisticsRestPath, null, null);
    super.makeGetRequest(
      requestUrl,
      false,
      (rawStatistics) => onSuccess(StatisticsLoader._initStatistics(rawStatistics)),
      onError
    );
  }
}
