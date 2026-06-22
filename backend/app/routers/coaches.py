from typing import List
from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.core.dependencies import get_db, require_admin
from app.models.coach import Coach
from app.models.user import User
from app.schemas.schemas import CoachCreate, CoachOut

router = APIRouter(prefix="/coaches", tags=["Coaches"])


@router.get("/", response_model=List[CoachOut])
def list_coaches(db: Session = Depends(get_db)):
    return db.query(Coach).order_by(Coach.display_order).all()


@router.post("/", response_model=CoachOut)
def create_coach(
    payload: CoachCreate,
    db: Session = Depends(get_db),
    _: User = Depends(require_admin),
):
    coach = Coach(**payload.model_dump())
    db.add(coach)
    db.commit()
    db.refresh(coach)
    return coach


@router.put("/{coach_id}", response_model=CoachOut)
def update_coach(
    coach_id: UUID,
    payload: CoachCreate,
    db: Session = Depends(get_db),
    _: User = Depends(require_admin),
):
    coach = db.query(Coach).filter(Coach.id == coach_id).first()
    if not coach:
        raise HTTPException(status_code=404, detail="Coach not found")
    for field, value in payload.model_dump().items():
        setattr(coach, field, value)
    db.commit()
    db.refresh(coach)
    return coach


@router.delete("/{coach_id}")
def delete_coach(
    coach_id: UUID,
    db: Session = Depends(get_db),
    _: User = Depends(require_admin),
):
    coach = db.query(Coach).filter(Coach.id == coach_id).first()
    if not coach:
        raise HTTPException(status_code=404, detail="Coach not found")
    db.delete(coach)
    db.commit()
    return {"message": "Deleted"}

