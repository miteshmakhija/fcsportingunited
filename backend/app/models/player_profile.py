import uuid
from datetime import date, datetime

from sqlalchemy import Column, Date, DateTime, ForeignKey, Integer, String
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship

from app.db.base import Base


class PlayerProfile(Base):
    __tablename__ = "player_profiles"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), unique=True, nullable=False)
    full_name = Column(String, nullable=False)
    date_of_birth = Column(Date)
    position = Column(String)  # GK, MF, FW, DF
    jersey_number = Column(Integer)
    parent_name = Column(String)
    parent_phone = Column(String)
    avatar_url = Column(String)
    joined_date = Column(Date, default=date.today)
    age_group = Column(String)  # U10, U13, U16
    created_at = Column(DateTime, default=datetime.utcnow)

    user = relationship("User", back_populates="player_profile")
    exercise_assignments = relationship("ExerciseAssignment", back_populates="player")
    metrics = relationship("PlayerMetric", back_populates="player")
    fees = relationship("Fee", back_populates="player")
    achievements = relationship("Achievement", back_populates="player")
    success_stories = relationship("SuccessStory", back_populates="player")
    progress_records = relationship("ExerciseProgress", back_populates="player")

