import uuid

from sqlalchemy import Boolean, Column, ForeignKey, String, Text
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship

from app.db.base import Base


class SuccessStory(Base):
    __tablename__ = "success_stories"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    player_name = Column(String, nullable=False)
    story = Column(Text)
    image_url = Column(String)
    quote = Column(String)
    year = Column(String)
    featured = Column(Boolean, default=False)
    player_id = Column(UUID(as_uuid=True), ForeignKey("player_profiles.id"), nullable=True)

    player = relationship("PlayerProfile", back_populates="success_stories")
