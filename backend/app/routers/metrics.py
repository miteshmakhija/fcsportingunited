from typing import List
from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.core.dependencies import get_current_user, get_db, require_admin
from app.models.player_metric import PlayerMetric
from app.models.player_profile import PlayerProfile
from app.models.user import User
from app.schemas.schemas import MetricCreate, MetricOut

router = APIRouter(prefix="/metrics", tags=["Metrics"])


@router.post("/", response_model=MetricOut)
def record_metric(
    payload: MetricCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_admin),
):
    metric = PlayerMetric(**payload.model_dump(), recorded_by=current_user.id)
    db.add(metric)
    db.commit()
    db.refresh(metric)
    return metric


@router.get("/player/{player_id}", response_model=List[MetricOut])
def get_player_metrics(
    player_id: UUID,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    profile = db.query(PlayerProfile).filter(PlayerProfile.id == player_id).first()
    if not profile:
        raise HTTPException(status_code=404, detail="Player not found")
    if current_user.role != "admin" and profile.user_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized")
    return (
        db.query(PlayerMetric)
        .filter(PlayerMetric.player_id == player_id)
        .order_by(PlayerMetric.recorded_at)
        .all()
    )


@router.get("/player/{player_id}/latest", response_model=MetricOut)
def get_latest_metric(
    player_id: UUID,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    profile = db.query(PlayerProfile).filter(PlayerProfile.id == player_id).first()
    if not profile:
        raise HTTPException(status_code=404, detail="Player not found")
    if current_user.role != "admin" and profile.user_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized")
    metric = (
        db.query(PlayerMetric)
        .filter(PlayerMetric.player_id == player_id)
        .order_by(PlayerMetric.recorded_at.desc())
        .first()
    )
    if not metric:
        raise HTTPException(status_code=404, detail="No metrics found")
    return metric


@router.put("/{metric_id}", response_model=MetricOut)
def update_metric(
    metric_id: UUID,
    payload: MetricCreate,
    db: Session = Depends(get_db),
    _: User = Depends(require_admin),
):
    metric = db.query(PlayerMetric).filter(PlayerMetric.id == metric_id).first()
    if not metric:
        raise HTTPException(status_code=404, detail="Metric not found")
    for field, value in payload.model_dump(exclude_unset=True).items():
        setattr(metric, field, value)
    db.commit()
    db.refresh(metric)
    return metric

