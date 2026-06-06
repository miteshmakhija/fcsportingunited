# FC Sporting United Academy

A full-stack web platform for **Sporting United Academy** — youth football development with kid/parent & admin portals, training-video assignments, performance metrics, fee tracking, and a public marketing site featuring the academy's mission to launch an **I-League** team by 2030.

> **Stack:** React (Vite + Tailwind) · FastAPI · PostgreSQL · Docker Compose · AWS-ready

---

## 🚀 Quick Start

### 1. Prerequisites
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) (with Docker Compose v2)
- Free ports: **80** (frontend), **8000** (backend), **5432** (Postgres), **5050** (pgAdmin – dev only)

### 2. Configure environment
```powershell
Copy-Item .env.example .env
# edit .env if you want to change credentials
```

### 3. Build & run
```powershell
docker compose up --build
# or, to include pgAdmin (dev profile)
docker compose --profile dev up --build
```

That's it. Open:

| URL | What |
|---|---|
| http://localhost | Public website + Login |
| http://localhost:8000/api/docs | FastAPI Swagger UI |
| http://localhost:5050 | pgAdmin (dev profile) |

### 4. Default Admin Login

```
email:    admin@sportingunited.com
password: Admin@123
```

The admin user is auto-created on first startup. Change `ADMIN_PASSWORD` in `.env` before deploying anywhere real.

---

## 🧭 What's in the box

### Public website
- **Home** with a multi-slide hero (success stories, coaching philosophy, I-League CTA)
- **Coaches** profiles page
- **Achievements** wall
- **Success Stories**
- **I-League Mission** (5-year roadmap timeline)
- **Player Metrics** showcase
- Crest-style **SVG logo** at `frontend/public/assets/logo.svg`

### Admin portal (`/admin`)
- **Manage Players** — create kid/parent logins + profiles
- **Exercises & Assignments** — build YouTube exercise library, assign drills with due dates
- **Player Metrics** — record speed/stamina/technique scores, view radar + trend charts
- **Fee Tracker** — generate monthly fees, mark paid, view summary stats

### Kid / Parent portal (`/dashboard`)
- Personal dashboard with progress at a glance
- **My Exercises** — embedded YouTube player + "Mark Complete" button
- **My Stats** — radar snapshot + line chart of progress over time

---

## 🗄 Database

PostgreSQL 16, schema auto-created from SQLAlchemy models on first boot. Tables:

`users`, `player_profiles`, `coaches`, `exercises`, `exercise_assignments`,
`exercise_progress`, `player_metrics`, `fees`, `achievements`, `success_stories`

To inspect data, use pgAdmin (dev profile) — connect to host `db`, user/pass from `.env`.

---

## 🗂 Project layout

```
fcsportingunited/
├── backend/                 # FastAPI app
│   ├── app/
│   │   ├── core/            # config, security (JWT, bcrypt), deps
│   │   ├── db/              # session, base, init_db (seeds admin)
│   │   ├── models/          # SQLAlchemy ORM
│   │   ├── schemas/         # Pydantic
│   │   ├── routers/         # /auth /players /exercises /progress
│   │   │                    # /metrics /fees /coaches /achievements
│   │   └── main.py
│   ├── Dockerfile
│   └── requirements.txt
├── frontend/                # React + Vite + Tailwind
│   ├── public/assets/logo.svg
│   ├── src/
│   │   ├── api/             # axios client + per-resource modules
│   │   ├── components/      # layout, common (HeroSlider, MetricRadar)
│   │   ├── context/         # AuthContext (JWT in localStorage)
│   │   ├── pages/
│   │   │   ├── public/      # Home, Coaches, Achievements, …, ILeagueMission
│   │   │   ├── auth/Login
│   │   │   ├── admin/       # Dashboard, Players, Exercises, Fees, Metrics
│   │   │   └── kid/         # Dashboard, MyExercises, MyStats
│   │   └── App.jsx
│   ├── Dockerfile
│   ├── nginx.conf           # proxies /api → backend container
│   ├── tailwind.config.js
│   └── vite.config.js
├── docker-compose.yml
├── .env.example
└── README.md
```

---

## 🔌 API Reference

Full interactive docs at **http://localhost:8000/api/docs**. Top-level endpoints:

| Group | Path | Notes |
|---|---|---|
| Auth | `POST /api/auth/login`  ·  `GET /api/auth/me` | JWT bearer |
| Players | `GET/POST /api/players/`  ·  `GET /api/players/me`  ·  `GET/PUT/DELETE /api/players/{id}` | Admin-managed |
| Exercises | `GET/POST/PUT/DELETE /api/exercises/`  ·  `POST /api/exercises/assign`  ·  `GET /api/exercises/assigned/{player_id}` | |
| Progress | `PUT /api/progress/{assignment_id}/complete`  ·  `GET /api/progress/player/{player_id}` | Kid marks complete |
| Metrics | `POST /api/metrics/`  ·  `GET /api/metrics/player/{id}`  ·  `GET /api/metrics/player/{id}/latest` | Recharts radar/line |
| Fees | `GET/POST/PUT /api/fees/`  ·  `GET /api/fees/player/{id}`  ·  `GET /api/fees/summary/stats` | |
| Coaches | `GET /api/coaches/`  (public)  ·  admin write | |
| Achievements | `GET /api/achievements`  (public) | |
| Success Stories | `GET /api/success-stories`  ·  `GET /api/success-stories/featured` | Featured power the Home slider |

---

## ☁️ AWS Deployment

The same `docker-compose.yml` is the deployment unit. Recommended setup:

| Layer | AWS Service |
|---|---|
| Containers | **ECS Fargate** (push images to **ECR**) |
| Load Balancer | **Application Load Balancer** → frontend (port 80) and `/api/*` to backend (8000) |
| Database | **RDS PostgreSQL 16** (replaces the `db` container — point `DATABASE_URL` at it) |
| Static media | **S3** + **CloudFront** (for player/coach photos) |
| Secrets | **AWS Secrets Manager** (`SECRET_KEY`, `ADMIN_PASSWORD`, DB creds) |
| TLS / DNS | **Route 53** + **ACM** (ALB termination) |
| CI/CD | **GitHub Actions** → build → push to ECR → `aws ecs update-service` |

### Minimal deployment steps
1. `aws ecr create-repository --repository-name sua-backend` (and `sua-frontend`)
2. Build & push: `docker compose build`, tag & `docker push` each image to ECR
3. Create RDS Postgres instance; copy `DATABASE_URL` into Secrets Manager
4. Create ECS task definitions for `backend` and `frontend` (read secrets from SM)
5. Create an ECS service behind an ALB with path-based routing (`/api/*` → backend, everything else → frontend)
6. Point Route 53 record at the ALB and attach an ACM cert

For a faster path use **AWS Copilot CLI** (`copilot init`) — it'll provision ECR, VPC, ECS, ALB, and a service per container with sensible defaults.

---

## 🛠 Development outside Docker

### Backend
```powershell
cd backend
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
$env:DATABASE_URL = "postgresql://postgres:postgres@localhost:5432/sportingdb"
uvicorn app.main:app --reload
```

### Frontend
```powershell
cd frontend
npm install
npm run dev          # http://localhost:5173 (proxies /api → http://backend:8000)
```
For local dev outside Docker, set `VITE_API_PROXY=http://localhost:8000` before `npm run dev`.

---

## 🎨 The Logo

A heraldic shield crest at `frontend/public/assets/logo.svg`:

- Deep forest-green shield with a gold outer border
- "SPORTING UNITED" arched along the top
- Central **SUA** monogram in champion-gold on a dark roundel
- Football beneath the monogram
- "ACADEMY" banner ribbon at the bottom
- Brand palette: `#1A5C38` (green), `#D4AF37` (gold), `#FFF8E7` (cream), `#0B1F14` (ink)

Use the SVG anywhere — kit badges, social avatars, favicon. Pair with **Bebas Neue** for display and **Inter** for body (already loaded via Google Fonts).

---

## ✅ Suggested Next Steps

1. **Seed real content** — add coaches, success stories, achievements via the admin APIs (Swagger UI is fastest).
2. **Image uploads** — currently `avatar_url`, `photo_url`, `image_url` accept any URL string. Add an S3 upload endpoint (`python-multipart` already installed) and a `<FileUpload>` component.
3. **Email & password reset** — wire SES + a `/auth/forgot-password` flow.
4. **Alembic migrations** — replace `Base.metadata.create_all` with versioned migrations once the schema stabilises.
5. **Tests** — add `pytest` for the API and Vitest/React Testing Library for the UI.
6. **CI/CD** — GitHub Actions workflow: lint → test → build → push to ECR → ECS deploy.
7. **Hardening before prod** — set strict CORS origins in `app/main.py`, rotate `SECRET_KEY`, enforce HTTPS only via ALB.
8. **Mobile polish** — the layout is responsive but the Navbar could use a hamburger menu for small screens.
9. **Parent vs Kid roles** — currently a single `kid` role; split into `kid` and `parent` if parents need a distinct view.
10. **Comparison view** — `MetricRadar` is designed to accept a second `compare` player; wire it up for side-by-side scouting.

---

## 📜 License

MIT — do whatever you like, just keep the copyright.

