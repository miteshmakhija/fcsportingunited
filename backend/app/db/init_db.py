from sqlalchemy.orm import Session

from app.core.config import settings
from app.core.security import get_password_hash
from app.db.base import Base
from app.db.session import engine
from app.models import user, player_profile, coach, exercise, exercise_assignment, progress, player_metric, fee, achievement, success_story, enquiry  # noqa: F401 - import all models so Base knows them


def init_db(db: Session) -> None:
    Base.metadata.create_all(bind=engine)

    from app.models.user import User
    admin = db.query(User).filter(User.email == settings.ADMIN_EMAIL).first()
    if not admin:
        admin_user = User(
            email=settings.ADMIN_EMAIL,
            hashed_password=get_password_hash(settings.ADMIN_PASSWORD),
            role="admin",
            is_active=True,
        )
        db.add(admin_user)
        db.commit()
        print(f"[init_db] Created admin user: {settings.ADMIN_EMAIL}")
    else:
        print("[init_db] Admin user already exists.")

