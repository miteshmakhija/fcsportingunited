import uuid
from datetime import datetime

from sqlalchemy import Column, Date, DateTime, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship

from app.db.base import Base


class ExerciseAssignment(Base):
    __tablename__ = "exercise_assignments"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    player_id = Column(UUID(as_uuid=True), ForeignKey("player_profiles.id"), nullable=False)
    exercise_id = Column(UUID(as_uuid=True), ForeignKey("exercises.id"), nullable=False)
    assigned_by = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    due_date = Column(Date, nullable=True)
    assigned_at = Column(DateTime, default=datetime.utcnow)

    player = relationship("PlayerProfile", back_populates="exercise_assignments")
    exercise = relationship("Exercise", back_populates="assignments")
    admin = relationship("User", foreign_keys=[assigned_by])
    progress = relationship("ExerciseProgress", back_populates="assignment", uselist=False)

