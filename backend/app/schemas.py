from pydantic import BaseModel


class StatisticsBase(BaseModel):
    count: int
    rank: int


class AcceptedCount(StatisticsBase):
    class Config:
        schema_extra = {"example": {"count": 3000, "rank": 15}}


class RatedPointSum(StatisticsBase):
    class Config:
        schema_extra = {"example": {"count": 500000, "rank": 50}}


class LongestStreak(StatisticsBase):
    class Config:
        schema_extra = {"example": {"count": 500, "rank": 50}}
