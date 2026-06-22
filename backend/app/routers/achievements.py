from typing import List
from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.core.dependencies import get_db, require_admin
from app.models.achievement import Achievement
from app.models.success_story import SuccessStory
from app.models.user import User
from app.schemas.schemas import AchievementCreate, AchievementOut, SuccessStoryCreate, SuccessStoryOut

router = APIRouter(tags=["Achievements & Stories"])


# ── Achievements ──────────────────────────────────────
@router.get("/achievements", response_model=List[AchievementOut])
def list_achievements(db: Session = Depends(get_db)):
    return db.query(Achievement).order_by(Achievement.date_achieved.desc()).all()


@router.post("/achievements", response_model=AchievementOut)
def create_achievement(
    payload: AchievementCreate,
    db: Session = Depends(get_db),
    _: User = Depends(require_admin),
):
    ach = Achievement(**payload.model_dump())
    db.add(ach)
    db.commit()
    db.refresh(ach)
    return ach


@router.put("/achievements/{ach_id}", response_model=AchievementOut)
def update_achievement(
    ach_id: UUID,
    payload: AchievementCreate,
    db: Session = Depends(get_db),
    _: User = Depends(require_admin),
):
    ach = db.query(Achievement).filter(Achievement.id == ach_id).first()
    if not ach:
        raise HTTPException(status_code=404, detail="Not found")
    for field, value in payload.model_dump().items():
        setattr(ach, field, value)
    db.commit()
    db.refresh(ach)
    return ach


# ── Success Stories ───────────────────────────────────
@router.get("/success-stories", response_model=List[SuccessStoryOut])
def list_stories(db: Session = Depends(get_db)):
    return db.query(SuccessStory).all()


@router.get("/success-stories/featured", response_model=List[SuccessStoryOut])
def featured_stories(db: Session = Depends(get_db)):
    return db.query(SuccessStory).filter(SuccessStory.featured == True).all()  # noqa: E712


@router.post("/success-stories", response_model=SuccessStoryOut)
def create_story(
    payload: SuccessStoryCreate,
    db: Session = Depends(get_db),
    _: User = Depends(require_admin),
):
    story = SuccessStory(**payload.model_dump())
    db.add(story)
    db.commit()
    db.refresh(story)
    return story


@router.put("/success-stories/{story_id}", response_model=SuccessStoryOut)
def update_story(
    story_id: UUID,
    payload: SuccessStoryCreate,
    db: Session = Depends(get_db),
    _: User = Depends(require_admin),
):
    story = db.query(SuccessStory).filter(SuccessStory.id == story_id).first()
    if not story:
        raise HTTPException(status_code=404, detail="Not found")
    for field, value in payload.model_dump().items():
        setattr(story, field, value)
    db.commit()
    db.refresh(story)
    return story
