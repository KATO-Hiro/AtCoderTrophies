/* eslint-disable camelcase */
import { AcceptedCountAPI } from './AcceptedCountAPI';
import { AcceptedCountByLanguageAPI } from './AcceptedCountByLanguageAPI';
import { LongestStreakAPI } from './LongestStreakAPI';
import { RatedPointSumAPI } from './RatedPointSumAPI';

export type AtCoderProblemsStatAPI = {
  accepted_count: AcceptedCountAPI;
  accepted_count_by_language: AcceptedCountByLanguageAPI;
  rated_point_sum: RatedPointSumAPI;
  longest_streak: LongestStreakAPI;
};
