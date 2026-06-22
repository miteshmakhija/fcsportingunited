import uuid
from datetime import datetime

from sqlalchemy import Column, DateTime, Integer, String, Text
from sqlalchemy.dialects.postgresql import UUID

from app.db.base import Base


class Enquiry(Base):
    """Admissions / 'Join the Academy' enquiry submitted from the public site."""

    __tablename__ = "enquiries"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    parent_name = Column(String, nullable=False)
    child_name = Column(String, nullable=False)
    child_age = Column(Integer)
    phone = Column(String, nullable=False)
    email = Column(String)
    program = Column(String)
    message = Column(Text)
    status = Column(String, default="new")  # new | contacted | enrolled | closed
    created_at = Column(DateTime, default=datetime.utcnow)
