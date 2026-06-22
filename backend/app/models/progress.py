import uuid
from datetime import datetime

from sqlalchemy import Column, DateTime, ForeignKey, Integer, Text
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship

from app.db.base import Base


class ExerciseProgress(Base):
    __tablename__ = "exercise_progress"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    assignment_id = Column(UUID(as_uuid=True), ForeignKey("exercise_assignments.id"), nullable=False)
    player_id = Column(UUID(as_uuid=True), ForeignKey("player_profiles.id"), nullable=False)
    completed_at = Column(DateTime, nullable=True)
    notes = Column(Text)
    rating = Column(Integer)  # 1-5 self-rating

    assignment = relationship("ExerciseAssignment", back_populates="progress")
    player = relationship("PlayerProfile", back_populates="progress_records")

