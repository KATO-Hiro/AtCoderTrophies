from typing import Optional

from pydantic import BaseModel


class StatisticsBase(BaseModel):
    count: int
    rank: int


class StatisticsByLanguage(StatisticsBase):
    language: str


class AcceptedCount(StatisticsBase):
    class Config:
        schema_extra = {"example": {"count": 3000, "rank": 15}}


class AcceptedCountByLanguage(BaseModel):
    languages: list[Optional[StatisticsByLanguage]] = []

    class Config:
        schema_extra = {
            "example": [
                {"language": "C++", "count": 2500, "rank": 15},
                {"language": "Python", "count": 500, "rank": 800},
            ]
        }


class RatedPointSum(StatisticsBase):
    class Config:
        schema_extra = {"example": {"count": 500000, "rank": 50}}


class LongestStreak(StatisticsBase):
    class Config:
        schema_extra = {"example": {"count": 500, "rank": 50}}


class AtCoderProblemsStatisticsAPI:
    accepted_count: AcceptedCount
    accepted_count_by_language: AcceptedCountByLanguage
    rated_point_sum: RatedPointSum
    longest_streak: LongestStreak

    class Config:
        schema_extra = {
            "example": {
                "accepted_count": {"count": 3000, "rank": 15},
                "accepted_count_by_language": {
                    "languages": [
                        {"language": "C++", "count": 2500, "rank": 15},
                        {"language": "Python", "count": 500, "rank": 800},
                    ]
                },
                "rated_point_sum": {"count": 500000, "rank": 50},
                "longest_streak": {"count": 500, "rank": 50},
            }
        }
