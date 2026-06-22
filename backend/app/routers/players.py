from typing import List, Optional
from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.core.dependencies import get_current_user, get_db, require_admin
from app.core.security import get_password_hash
from app.models.player_profile import PlayerProfile
from app.models.user import User
from app.schemas.schemas import PlayerProfileCreate, PlayerProfileOut, PlayerProfileUpdate

router = APIRouter(prefix="/players", tags=["Players"])


@router.get("/", response_model=List[PlayerProfileOut])
def list_players(
    age_group: Optional[str] = None,
    position: Optional[str] = None,
    db: Session = Depends(get_db),
    _: User = Depends(require_admin),
):
    q = db.query(PlayerProfile)
    if age_group:
        q = q.filter(PlayerProfile.age_group == age_group)
    if position:
        q = q.filter(PlayerProfile.position == position)
    return q.all()


@router.post("/", response_model=PlayerProfileOut)
def create_player(
    payload: PlayerProfileCreate,
    db: Session = Depends(get_db),
    _: User = Depends(require_admin),
):
    existing = db.query(User).filter(User.email == payload.email).first()
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")
    user = User(
        email=payload.email,
        hashed_password=get_password_hash(payload.password),
        role="kid",
    )
    db.add(user)
    db.flush()

    profile = PlayerProfile(
        user_id=user.id,
        full_name=payload.full_name,
        date_of_birth=payload.date_of_birth,
        position=payload.position,
        jersey_number=payload.jersey_number,
        parent_name=payload.parent_name,
        parent_phone=payload.parent_phone,
        avatar_url=payload.avatar_url,
        age_group=payload.age_group,
    )
    db.add(profile)
    db.commit()
    db.refresh(profile)
    return profile


@router.get("/me", response_model=PlayerProfileOut)
def get_my_profile(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    profile = db.query(PlayerProfile).filter(PlayerProfile.user_id == current_user.id).first()
    if not profile:
        raise HTTPException(status_code=404, detail="Profile not found")
    return profile


@router.get("/{player_id}", response_model=PlayerProfileOut)
def get_player(
    player_id: UUID,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    profile = db.query(PlayerProfile).filter(PlayerProfile.id == player_id).first()
    if not profile:
        raise HTTPException(status_code=404, detail="Player not found")
    if current_user.role != "admin" and profile.user_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized")
    return profile


@router.put("/{player_id}", response_model=PlayerProfileOut)
def update_player(
    player_id: UUID,
    payload: PlayerProfileUpdate,
    db: Session = Depends(get_db),
    _: User = Depends(require_admin),
):
    profile = db.query(PlayerProfile).filter(PlayerProfile.id == player_id).first()
    if not profile:
        raise HTTPException(status_code=404, detail="Player not found")
    for field, value in payload.model_dump(exclude_unset=True).items():
        setattr(profile, field, value)
    db.commit()
    db.refresh(profile)
    return profile


@router.delete("/{player_id}")
def delete_player(
    player_id: UUID,
    db: Session = Depends(get_db),
    _: User = Depends(require_admin),
):
    profile = db.query(PlayerProfile).filter(PlayerProfile.id == player_id).first()
    if not profile:
        raise HTTPException(status_code=404, detail="Player not found")
    user = db.query(User).filter(User.id == profile.user_id).first()
    if user:
        user.is_active = False
    db.commit()
    return {"message": "Player deactivated"}

