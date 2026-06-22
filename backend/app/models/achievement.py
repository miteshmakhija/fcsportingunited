import uuid

from sqlalchemy import Boolean, Column, Date, ForeignKey, String, Text
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship

from app.db.base import Base


class Achievement(Base):
    __tablename__ = "achievements"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    title = Column(String, nullable=False)
    description = Column(Text)
    date_achieved = Column(Date)
    image_url = Column(String)
    category = Column(String)  # Tournament, Individual, etc.
    player_id = Column(UUID(as_uuid=True), ForeignKey("player_profiles.id"), nullable=True)

    player = relationship("PlayerProfile", back_populates="achievements")
