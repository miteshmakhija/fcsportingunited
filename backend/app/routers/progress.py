from datetime import datetime
from typing import List
from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.core.dependencies import get_current_user, get_db
from app.models.exercise_assignment import ExerciseAssignment
from app.models.player_profile import PlayerProfile
from app.models.progress import ExerciseProgress
from app.models.user import User
from app.schemas.schemas import ProgressOut, ProgressUpdate

router = APIRouter(prefix="/progress", tags=["Progress"])


@router.put("/{assignment_id}/complete", response_model=ProgressOut)
def mark_complete(
    assignment_id: UUID,
    payload: ProgressUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    assignment = db.query(ExerciseAssignment).filter(ExerciseAssignment.id == assignment_id).first()
    if not assignment:
        raise HTTPException(status_code=404, detail="Assignment not found")

    profile = db.query(PlayerProfile).filter(PlayerProfile.id == assignment.player_id).first()
    if not profile or profile.user_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized")

    prog = db.query(ExerciseProgress).filter(
        ExerciseProgress.assignment_id == assignment_id
    ).first()

    if prog:
        prog.completed_at = datetime.utcnow()
        prog.notes = payload.notes
        prog.rating = payload.rating
    else:
        prog = ExerciseProgress(
            assignment_id=assignment_id,
            player_id=assignment.player_id,
            completed_at=datetime.utcnow(),
            notes=payload.notes,
            rating=payload.rating,
        )
        db.add(prog)

    db.commit()
    db.refresh(prog)
    return prog


@router.get("/player/{player_id}", response_model=List[ProgressOut])
def get_player_progress(
    player_id: UUID,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    profile = db.query(PlayerProfile).filter(PlayerProfile.id == player_id).first()
    if not profile:
        raise HTTPException(status_code=404, detail="Player not found")
    if current_user.role != "admin" and profile.user_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized")
    return db.query(ExerciseProgress).filter(ExerciseProgress.player_id == player_id).all()

