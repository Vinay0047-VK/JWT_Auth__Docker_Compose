# JWT_Auth__Docker_Compose

# **Jun 10 2026**

GitHub Connected to local system - Jun 10 2026

- installed django
- pipenv

Commands
> pipenv shell 
to create virtual environment

> pipenv install djangorestframework-simplejwt

> pipenv install djangorestframework

> pipenv install psycopg2-binary

> pipenv install python-decouple

> django-admin startproject config .
to create __config__ folder

> python manage.py runserver
to run server

> python manage.py startapp users
app folder __users__

> python manage.py startapp tasks
app folder __tasks__

Added __users__ , __tasks__ to INSTALLED_APPS in `config/settings.py`

In __users__/models.py 
creating user model

In __config__/settings.py 

- AUTH_USER_MODEL = "users.User"
- Changes in settings.py

Configuring Environment variables

Added __gitignore__ 


# **Jun 11 2026**

Created vite App

> npm create vite@latest . -- --template react

Created Folders
- __api__/
    axiosInstance.js
    auth.js
    tasks.js

- __context__/
    AuthContext.jsx

- __hooks__/
    useAuth.js
    useTasks.js

- __pages__/
    Login.jsx
    Register.jsx
    Dashboard.jsx

- __components__/
    PrivateRoute.jsx
    Navbar.jsx
    TaskCard.jsx
    TaskForm.jsx
    Spinner.jsx

---

# **Jun 15 2026**

__Frontend Phase-2__
---

# **Jun 20 2026**

__Backend Phase-3__

Task App CRUD

Added Docker files in Root and also frontend and backend


# **Jun 27 2026**

tests were added to test authentication and tasks




# Task Manager API

A full-stack task management application built with Django REST Framework, React, JWT authentication, and Docker Compose.

<!-- ![CI](https://github.com/YOUR_USERNAME/YOUR_REPO/actions/workflows/ci.yml/badge.svg) -->
![Python](https://img.shields.io/badge/Python-3.12-blue)
![Django](https://img.shields.io/badge/Django-5.0-green)
![React](https://img.shields.io/badge/React-18-61DAFB)
![Docker](https://img.shields.io/badge/Docker-Compose-2496ED)

## Tech Stack

| Layer | Technology |
|---|---|
| Backend | Django 5.0, Django REST Framework |
| Auth | JWT (access + refresh tokens, blacklist on logout) |
| Frontend | React 18, Vite, Axios |
| Database | PostgreSQL 15 |
| Cache | Redis 7 |
| Server | Gunicorn + Nginx |
| Containers | Docker Compose |
| Tests | pytest-django (27 tests, 95%+ coverage) |

## Features

- JWT authentication — register, login, logout, token refresh
- Token blacklisting on logout (refresh token invalidated server-side)
- Full task CRUD — create, read, update, delete
- Per-user data isolation — users only see their own tasks
- Status filtering (`?status=todo/in_progress/done`)
- Paginated API responses
- Auto-generated Swagger/OpenAPI docs
- GitHub Actions CI on every push

## Quick Start

### Prerequisites
- Docker Desktop installed and running

### Run with Docker (recommended)

```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPO.git
cd YOUR_REPO
cp .env.example .env
docker compose up --build
```

Then open:
- **App** → http://localhost
- **API docs** → http://localhost/api/docs/
- **Admin** → http://localhost/admin/

Create a superuser:
```bash
docker compose exec backend python manage.py createsuperuser
```

### Run locally (without Docker)

```bash
# Backend
cd backend
python -m venv venv && source venv/bin/activate
pip install -r requirements.txt
cp .env.example .env   # fill in your local DB credentials
python manage.py migrate
python manage.py runserver

# Frontend (separate terminal)
cd frontend
npm install
npm run dev
```

## API Endpoints

### Auth
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/auth/register/` | None | Create account |
| POST | `/api/auth/login/` | None | Get access + refresh token |
| POST | `/api/auth/logout/` | JWT | Blacklist refresh token |
| POST | `/api/auth/token/refresh/` | None | Rotate access token |
| GET | `/api/auth/me/` | JWT | Get current user |

### Tasks
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/tasks/` | JWT | List user's tasks |
| POST | `/api/tasks/` | JWT | Create task |
| GET | `/api/tasks/{id}/` | JWT | Get single task |
| PATCH | `/api/tasks/{id}/` | JWT | Update task |
| DELETE | `/api/tasks/{id}/` | JWT | Delete task |

Query params: `?status=todo`, `?status=in_progress`, `?status=done`, `?ordering=-created_at`

## Running Tests

```bash
# Run all tests
make test

# With coverage report
make coverage

# Inside Docker
docker compose exec backend pytest
```

## Project Structure

```
task-manager/
├── backend/              # Django REST API
│   ├── config/           # Settings, URLs
│   ├── users/            # Auth + custom user model
│   ├── tasks/            # Task CRUD resource
│   └── tests/            # pytest test suite
├── frontend/             # React + Vite
│   └── src/
│       ├── api/          # Axios instance + API modules
│       ├── context/      # AuthContext
│       ├── hooks/        # useAuth, useTasks
│       ├── pages/        # Login, Register, Dashboard
│       └── components/   # Navbar, TaskCard, TaskForm
├── docker/
│   └── nginx/            # Reverse proxy config
├── docker-compose.yml
└── Makefile
```

## Environment Variables

Copy `.env.example` to `.env` and fill in:

```bash
SECRET_KEY=your-secret-key
DEBUG=False
ALLOWED_HOSTS=localhost,127.0.0.1
POSTGRES_DB=taskdb
POSTGRES_USER=postgres
POSTGRES_PASSWORD=your-password
DB_HOST=db
DB_PORT=5432
REDIS_URL=redis://redis:6379/0
CORS_ALLOWED_ORIGINS=http://localhost
```