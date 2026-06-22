from typing import List, Optional
from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import func
from sqlalchemy.orm import Session

from app.core.dependencies import get_current_user, get_db, require_admin
from app.models.fee import Fee
from app.models.player_profile import PlayerProfile
from app.models.user import User
from app.schemas.schemas import FeeCreate, FeeOut, FeeUpdate

router = APIRouter(prefix="/fees", tags=["Fees"])


@router.get("/", response_model=List[FeeOut])
def list_fees(
    status: Optional[str] = None,
    player_id: Optional[UUID] = None,
    db: Session = Depends(get_db),
    _: User = Depends(require_admin),
):
    q = db.query(Fee)
    if status:
        q = q.filter(Fee.status == status)
    if player_id:
        q = q.filter(Fee.player_id == player_id)
    return q.order_by(Fee.due_date.desc()).all()


@router.post("/", response_model=FeeOut)
def create_fee(
    payload: FeeCreate,
    db: Session = Depends(get_db),
    _: User = Depends(require_admin),
):
    fee = Fee(**payload.model_dump())
    db.add(fee)
    db.commit()
    db.refresh(fee)
    return fee


@router.put("/{fee_id}", response_model=FeeOut)
def update_fee(
    fee_id: UUID,
    payload: FeeUpdate,
    db: Session = Depends(get_db),
    _: User = Depends(require_admin),
):
    fee = db.query(Fee).filter(Fee.id == fee_id).first()
    if not fee:
        raise HTTPException(status_code=404, detail="Fee not found")
    for field, value in payload.model_dump(exclude_unset=True).items():
        setattr(fee, field, value)
    db.commit()
    db.refresh(fee)
    return fee


@router.get("/player/{player_id}", response_model=List[FeeOut])
def get_player_fees(
    player_id: UUID,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    profile = db.query(PlayerProfile).filter(PlayerProfile.id == player_id).first()
    if not profile:
        raise HTTPException(status_code=404, detail="Player not found")
    if current_user.role != "admin" and profile.user_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized")
    return db.query(Fee).filter(Fee.player_id == player_id).order_by(Fee.due_date.desc()).all()


@router.get("/summary/stats")
def fee_summary(db: Session = Depends(get_db), _: User = Depends(require_admin)):
    total_collected = db.query(func.sum(Fee.amount)).filter(Fee.status == "paid").scalar() or 0
    total_pending = db.query(func.sum(Fee.amount)).filter(Fee.status == "pending").scalar() or 0
    total_overdue = db.query(func.sum(Fee.amount)).filter(Fee.status == "overdue").scalar() or 0
    return {
        "total_collected": float(total_collected),
        "total_pending": float(total_pending),
        "total_overdue": float(total_overdue),
    }

