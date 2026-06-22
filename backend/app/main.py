import time

from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware

from app.core.config import settings
from app.routers import auth, players, exercises, progress, metrics, fees, coaches, achievements, enquiries

app = FastAPI(
    title=settings.PROJECT_NAME,
    version="1.0.0",
    docs_url="/api/docs",
    redoc_url="/api/redoc",
    openapi_url="/api/openapi.json",
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # tighten in prod
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.middleware("http")
async def add_process_time_header(request: Request, call_next):
    start = time.time()
    response = await call_next(request)
    response.headers["X-Process-Time"] = str(time.time() - start)
    return response


# Routers
prefix = settings.API_V1_STR
app.include_router(auth.router, prefix=prefix)
app.include_router(players.router, prefix=prefix)
app.include_router(exercises.router, prefix=prefix)
app.include_router(progress.router, prefix=prefix)
app.include_router(metrics.router, prefix=prefix)
app.include_router(fees.router, prefix=prefix)
app.include_router(coaches.router, prefix=prefix)
app.include_router(achievements.router, prefix=prefix)
app.include_router(enquiries.router, prefix=prefix)


@app.get("/api/health")
def health():
    return {"status": "ok", "service": settings.PROJECT_NAME}


@app.on_event("startup")
def on_startup():
    from app.db.session import SessionLocal
    from app.db.init_db import init_db
    db = SessionLocal()
    try:
        init_db(db)
    finally:
        db.close()

