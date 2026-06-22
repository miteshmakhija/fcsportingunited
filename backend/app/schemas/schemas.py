from datetime import date, datetime
from typing import List, Optional
from uuid import UUID

from pydantic import BaseModel, EmailStr


# ── Auth ──────────────────────────────────────────────
class Token(BaseModel):
    access_token: str
    token_type: str
    role: str
    user_id: str


class LoginRequest(BaseModel):
    email: EmailStr
    password: str


# ── User ──────────────────────────────────────────────
class UserBase(BaseModel):
    email: EmailStr
    role: str = "kid"


class UserCreate(UserBase):
    password: str


class UserOut(UserBase):
    id: UUID
    is_active: bool
    created_at: datetime

    class Config:
        from_attributes = True


# ── Player Profile ────────────────────────────────────
class PlayerProfileBase(BaseModel):
    full_name: str
    date_of_birth: Optional[date] = None
    position: Optional[str] = None
    jersey_number: Optional[int] = None
    parent_name: Optional[str] = None
    parent_phone: Optional[str] = None
    avatar_url: Optional[str] = None
    age_group: Optional[str] = None


class PlayerProfileCreate(PlayerProfileBase):
    email: str
    password: str


class PlayerProfileUpdate(PlayerProfileBase):
    pass


class PlayerProfileOut(PlayerProfileBase):
    id: UUID
    user_id: UUID
    joined_date: Optional[date]
    created_at: datetime

    class Config:
        from_attributes = True


# ── Coach ─────────────────────────────────────────────
class CoachBase(BaseModel):
    name: str
    role_title: Optional[str] = None
    bio: Optional[str] = None
    photo_url: Optional[str] = None
    certifications: Optional[List[str]] = []
    years_experience: Optional[int] = 0
    display_order: Optional[int] = 0
    nationality: Optional[str] = None
    specialization: Optional[str] = None


class CoachCreate(CoachBase):
    pass


class CoachOut(CoachBase):
    id: UUID

    class Config:
        from_attributes = True


# ── Exercise ──────────────────────────────────────────
class ExerciseBase(BaseModel):
    title: str
    description: Optional[str] = None
    youtube_url: str
    category: Optional[str] = None
    difficulty: Optional[str] = "beginner"


class ExerciseCreate(ExerciseBase):
    pass


class ExerciseOut(ExerciseBase):
    id: UUID
    created_at: datetime

    class Config:
        from_attributes = True


# ── Assignment ────────────────────────────────────────
class AssignmentCreate(BaseModel):
    player_id: UUID
    exercise_id: UUID
    due_date: Optional[date] = None


class AssignmentOut(BaseModel):
    id: UUID
    player_id: UUID
    exercise_id: UUID
    due_date: Optional[date]
    assigned_at: datetime
    exercise: ExerciseOut
    completed: bool = False

    class Config:
        from_attributes = True


# ── Progress ──────────────────────────────────────────
class ProgressUpdate(BaseModel):
    notes: Optional[str] = None
    rating: Optional[int] = None


class ProgressOut(BaseModel):
    id: UUID
    assignment_id: UUID
    player_id: UUID
    completed_at: Optional[datetime]
    notes: Optional[str]
    rating: Optional[int]

    class Config:
        from_attributes = True


# ── Metric ────────────────────────────────────────────
class MetricBase(BaseModel):
    speed_kmh: Optional[float] = None
    stamina_score: Optional[float] = None
    dribbling_score: Optional[float] = None
    passing_accuracy: Optional[float] = None
    shooting_accuracy: Optional[float] = None
    heading_score: Optional[float] = None
    positioning_score: Optional[float] = None
    teamwork_score: Optional[float] = None
    notes: Optional[str] = None


class MetricCreate(MetricBase):
    player_id: UUID


class MetricOut(MetricBase):
    id: UUID
    player_id: UUID
    recorded_at: datetime

    class Config:
        from_attributes = True


# ── Fee ───────────────────────────────────────────────
class FeeBase(BaseModel):
    player_id: UUID
    amount: float
    period_label: str
    due_date: Optional[date] = None
    payment_method: Optional[str] = None
    notes: Optional[str] = None


class FeeCreate(FeeBase):
    pass


class FeeUpdate(BaseModel):
    status: Optional[str] = None
    paid_date: Optional[date] = None
    payment_method: Optional[str] = None
    notes: Optional[str] = None


class FeeOut(FeeBase):
    id: UUID
    status: str
    paid_date: Optional[date]
    created_at: datetime

    class Config:
        from_attributes = True


# ── Achievement ───────────────────────────────────────
class AchievementBase(BaseModel):
    title: str
    description: Optional[str] = None
    date_achieved: Optional[date] = None
    image_url: Optional[str] = None
    category: Optional[str] = None
    player_id: Optional[UUID] = None


class AchievementCreate(AchievementBase):
    pass


class AchievementOut(AchievementBase):
    id: UUID

    class Config:
        from_attributes = True


# ── Success Story ─────────────────────────────────────
class SuccessStoryBase(BaseModel):
    player_name: str
    story: Optional[str] = None
    image_url: Optional[str] = None
    quote: Optional[str] = None
    year: Optional[str] = None
    featured: Optional[bool] = False
    player_id: Optional[UUID] = None


class SuccessStoryCreate(SuccessStoryBase):
    pass


class SuccessStoryOut(SuccessStoryBase):
    id: UUID

    class Config:
        from_attributes = True


# ── Enquiry (Join the Academy) ────────────────────────
class EnquiryCreate(BaseModel):
    parent_name: str
    child_name: str
    child_age: Optional[int] = None
    phone: str
    email: Optional[EmailStr] = None
    program: Optional[str] = None
    message: Optional[str] = None


class EnquiryStatusUpdate(BaseModel):
    status: str


class EnquiryOut(BaseModel):
    id: UUID
    parent_name: str
    child_name: str
    child_age: Optional[int] = None
    phone: str
    email: Optional[str] = None
    program: Optional[str] = None
    message: Optional[str] = None
    status: str
    created_at: datetime

    class Config:
        from_attributes = True

