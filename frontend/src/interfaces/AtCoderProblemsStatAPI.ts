/* eslint-disable camelcase */
import type { AcceptedCountAPI } from './AcceptedCountAPI';
import type { AcceptedCountByLanguageAPI } from './AcceptedCountByLanguageAPI';
import type { LongestStreakAPI } from './LongestStreakAPI';
import type { RatedPointSumAPI } from './RatedPointSumAPI';

export type AtCoderProblemsStatAPI = {
  accepted_count: AcceptedCountAPI;
  accepted_count_by_language: AcceptedCountByLanguageAPI;
  rated_point_sum: RatedPointSumAPI;
  longest_streak: LongestStreakAPI;
};
