from pydantic import BaseModel


class StatisticsBase(BaseModel):
    count: int
    rank: int


class AcceptedCount(StatisticsBase):
    class Config:
        schema_extra = {"example": {"count": 3000, "rank": 15}}
