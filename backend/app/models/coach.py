import uuid

from sqlalchemy import Column, Integer, String, Text
from sqlalchemy.dialects.postgresql import JSONB, UUID

from app.db.base import Base


class Coach(Base):
    __tablename__ = "coaches"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(String, nullable=False)
    role_title = Column(String)
    bio = Column(Text)
    photo_url = Column(String)
    certifications = Column(JSONB, default=list)
    years_experience = Column(Integer, default=0)
    display_order = Column(Integer, default=0)
    nationality = Column(String)
    specialization = Column(String)

