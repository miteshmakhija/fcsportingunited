import uuid
from datetime import datetime

from sqlalchemy import Column, DateTime, Enum, ForeignKey, String, Text
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship

from app.db.base import Base


class Exercise(Base):
    __tablename__ = "exercises"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    title = Column(String, nullable=False)
    description = Column(Text)
    youtube_url = Column(String, nullable=False)
    category = Column(String)  # Dribbling, Fitness, Shooting, Passing, etc.
    difficulty = Column(Enum("beginner", "intermediate", "advanced", name="difficulty_level"), default="beginner")
    created_by = Column(UUID(as_uuid=True), ForeignKey("users.id"))
    created_at = Column(DateTime, default=datetime.utcnow)

    assignments = relationship("ExerciseAssignment", back_populates="exercise")
    creator = relationship("User", foreign_keys=[created_by])

