import uuid
from datetime import datetime

from sqlalchemy import Column, DateTime, ForeignKey, Numeric, Text
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship

from app.db.base import Base


class PlayerMetric(Base):
    __tablename__ = "player_metrics"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    player_id = Column(UUID(as_uuid=True), ForeignKey("player_profiles.id"), nullable=False)
    recorded_by = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    recorded_at = Column(DateTime, default=datetime.utcnow)
    speed_kmh = Column(Numeric(5, 2))
    stamina_score = Column(Numeric(5, 2))
    dribbling_score = Column(Numeric(5, 2))
    passing_accuracy = Column(Numeric(5, 2))
    shooting_accuracy = Column(Numeric(5, 2))
    heading_score = Column(Numeric(5, 2))
    positioning_score = Column(Numeric(5, 2))
    teamwork_score = Column(Numeric(5, 2))
    notes = Column(Text)

    player = relationship("PlayerProfile", back_populates="metrics")
    recorder = relationship("User", foreign_keys=[recorded_by])

