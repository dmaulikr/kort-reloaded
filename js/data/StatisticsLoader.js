import Config from '../constants/Config';
import DataLoader from './DataLoader';
import Statistics from '../dto/Statistics';

const statisticsRestPath = Config.STATISTICS_PATH;

class StatisticsLoader extends DataLoader {
  static _initStatistics(rawStatistics) {
    return new Statistics(rawStatistics.fix_count, rawStatistics.validated_fix_count,
      rawStatistics.falsepositive_fix_count, rawStatistics.complete_fix_count,
      rawStatistics.incomplete_fix_count, rawStatistics.vote_count, rawStatistics.valid_vote_count,
      rawStatistics.invalid_vote_count, rawStatistics.user_count, rawStatistics.active_user_count,
      rawStatistics.osm_user_count, rawStatistics.google_user_count, rawStatistics.fb_user_count,
      rawStatistics.badge_count, rawStatistics.first_place_badge_count,
      rawStatistics.second_place_badge_count, rawStatistics.third_place_badge_count,
      rawStatistics.hundred_missions_badge_count, rawStatistics.fifty_missions_badge_count,
      rawStatistics.ten_missions_badge_count, rawStatistics.thousand_checks_badge_count,
      rawStatistics.hundred_checks_badge_count, rawStatistics.ten_checks_badge_count,
      rawStatistics.first_mission_badge_count, rawStatistics.first_check_badge_count);
  }

  static getStatistics(onSuccess, onError) {
    const requestUrl = super.createRequestUrl(statisticsRestPath, null, null);
    super.makeGetRequest(requestUrl,
      false,
      (rawStatistics) => onSuccess(StatisticsLoader._initStatistics(rawStatistics)),
      onError,
      null);
  }
}
