from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    DATABASE_URL: str = "postgresql://postgres:postgres@db:5432/sportingdb"
    SECRET_KEY: str = "change-me-in-production-very-secret-key-2024"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24  # 24 hours
    ADMIN_EMAIL: str = "admin@sportingunited.com"
    ADMIN_PASSWORD: str = "Admin@123"
    PROJECT_NAME: str = "FC Sporting United Academy"
    API_V1_STR: str = "/api"

    class Config:
        env_file = ".env"
        case_sensitive = True


settings = Settings()

