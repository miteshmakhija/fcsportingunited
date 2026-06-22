from typing import List, Optional
from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.core.dependencies import get_db, require_admin
from app.models.enquiry import Enquiry
from app.models.user import User
from app.schemas.schemas import EnquiryCreate, EnquiryOut, EnquiryStatusUpdate

router = APIRouter(prefix="/enquiries", tags=["Enquiries"])


@router.post("/", response_model=EnquiryOut)
def create_enquiry(payload: EnquiryCreate, db: Session = Depends(get_db)):
    """Public endpoint — parents submit a 'Join the Academy' enquiry."""
    enquiry = Enquiry(**payload.model_dump())
    db.add(enquiry)
    db.commit()
    db.refresh(enquiry)
    return enquiry


@router.get("/", response_model=List[EnquiryOut])
def list_enquiries(
    status: Optional[str] = None,
    db: Session = Depends(get_db),
    _: User = Depends(require_admin),
):
    query = db.query(Enquiry)
    if status:
        query = query.filter(Enquiry.status == status)
    return query.order_by(Enquiry.created_at.desc()).all()


@router.put("/{enquiry_id}", response_model=EnquiryOut)
def update_enquiry_status(
    enquiry_id: UUID,
    payload: EnquiryStatusUpdate,
    db: Session = Depends(get_db),
    _: User = Depends(require_admin),
):
    enquiry = db.query(Enquiry).filter(Enquiry.id == enquiry_id).first()
    if not enquiry:
        raise HTTPException(status_code=404, detail="Enquiry not found")
    enquiry.status = payload.status
    db.commit()
    db.refresh(enquiry)
    return enquiry


@router.delete("/{enquiry_id}")
def delete_enquiry(
    enquiry_id: UUID,
    db: Session = Depends(get_db),
    _: User = Depends(require_admin),
):
    enquiry = db.query(Enquiry).filter(Enquiry.id == enquiry_id).first()
    if not enquiry:
        raise HTTPException(status_code=404, detail="Enquiry not found")
    db.delete(enquiry)
    db.commit()
    return {"message": "Deleted"}
