from typing import List, Optional

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
    languages: List[Optional[StatisticsByLanguage]] = []

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
