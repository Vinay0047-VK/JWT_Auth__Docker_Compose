.PHONY: up down build logs test lint shell migrate

up:
	docker compose up

build:
	docker compose up --build

down:
	docker compose down

down-v:
	docker compose down -v

logs:
	docker compose logs -f

test:
	cd backend && pytest

coverage:
	cd backend && pytest --cov=users --cov=tasks --cov-report=term-missing

lint:
	cd backend && flake8 . --max-line-length=100 --exclude=migrations,venv

shell:
	docker compose exec backend python manage.py shell

migrate:
	docker compose exec backend python manage.py migrate

superuser:
	docker compose exec backend python manage.py createsuperuser