from typing import List
from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.core.dependencies import get_current_user, get_db, require_admin
from app.models.exercise import Exercise
from app.models.exercise_assignment import ExerciseAssignment
from app.models.progress import ExerciseProgress
from app.models.user import User
from app.schemas.schemas import AssignmentCreate, AssignmentOut, ExerciseCreate, ExerciseOut

router = APIRouter(prefix="/exercises", tags=["Exercises"])


@router.get("/", response_model=List[ExerciseOut])
def list_exercises(db: Session = Depends(get_db), _: User = Depends(require_admin)):
    return db.query(Exercise).all()


@router.post("/", response_model=ExerciseOut)
def create_exercise(
    payload: ExerciseCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_admin),
):
    ex = Exercise(**payload.model_dump(), created_by=current_user.id)
    db.add(ex)
    db.commit()
    db.refresh(ex)
    return ex


@router.put("/{exercise_id}", response_model=ExerciseOut)
def update_exercise(
    exercise_id: UUID,
    payload: ExerciseCreate,
    db: Session = Depends(get_db),
    _: User = Depends(require_admin),
):
    ex = db.query(Exercise).filter(Exercise.id == exercise_id).first()
    if not ex:
        raise HTTPException(status_code=404, detail="Exercise not found")
    for field, value in payload.model_dump().items():
        setattr(ex, field, value)
    db.commit()
    db.refresh(ex)
    return ex


@router.delete("/{exercise_id}")
def delete_exercise(
    exercise_id: UUID,
    db: Session = Depends(get_db),
    _: User = Depends(require_admin),
):
    ex = db.query(Exercise).filter(Exercise.id == exercise_id).first()
    if not ex:
        raise HTTPException(status_code=404, detail="Exercise not found")
    db.delete(ex)
    db.commit()
    return {"message": "Deleted"}


@router.post("/assign", response_model=AssignmentOut)
def assign_exercise(
    payload: AssignmentCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_admin),
):
    assignment = ExerciseAssignment(
        player_id=payload.player_id,
        exercise_id=payload.exercise_id,
        assigned_by=current_user.id,
        due_date=payload.due_date,
    )
    db.add(assignment)
    db.commit()
    db.refresh(assignment)

    progress = db.query(ExerciseProgress).filter(
        ExerciseProgress.assignment_id == assignment.id
    ).first()
    result = AssignmentOut.model_validate(assignment)
    result.completed = progress is not None and progress.completed_at is not None
    return result


@router.get("/assigned/{player_id}", response_model=List[AssignmentOut])
def get_player_assignments(
    player_id: UUID,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    from app.models.player_profile import PlayerProfile
    profile = db.query(PlayerProfile).filter(PlayerProfile.id == player_id).first()
    if not profile:
        raise HTTPException(status_code=404, detail="Player not found")
    if current_user.role != "admin" and profile.user_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized")

    assignments = db.query(ExerciseAssignment).filter(
        ExerciseAssignment.player_id == player_id
    ).all()

    results = []
    for a in assignments:
        progress = db.query(ExerciseProgress).filter(
            ExerciseProgress.assignment_id == a.id
        ).first()
        out = AssignmentOut.model_validate(a)
        out.completed = progress is not None and progress.completed_at is not None
        results.append(out)
    return results

