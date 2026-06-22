import uuid
from datetime import datetime

from sqlalchemy import Column, Date, DateTime, Enum, ForeignKey, Numeric, String, Text
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship

from app.db.base import Base


class Fee(Base):
    __tablename__ = "fees"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    player_id = Column(UUID(as_uuid=True), ForeignKey("player_profiles.id"), nullable=False)
    amount = Column(Numeric(10, 2), nullable=False)
    period_label = Column(String, nullable=False)  # "Jan 2025", "Term 1"
    due_date = Column(Date)
    paid_date = Column(Date, nullable=True)
    status = Column(Enum("pending", "paid", "overdue", name="fee_status"), default="pending")
    payment_method = Column(String)  # Cash, UPI, Bank
    notes = Column(Text)
    created_at = Column(DateTime, default=datetime.utcnow)

    player = relationship("PlayerProfile", back_populates="fees")

