# IoT Device Inventory – 7CS069/UZ1

Full‑stack prototype using **React (Vite)** + **Laravel 10** with **SQLite** persistence.

## Quick Start
Backend:
```bash
cd backend
composer create-project laravel/laravel .
composer require fruitcake/laravel-cors
cp .env.example .env
touch database/database.sqlite
php artisan migrate
php artisan serve --host=127.0.0.1 --port=8000
```

Frontend:
```bash
cd frontend
npm install
cp .env.example .env   # contains VITE_API_BASE
npm run dev            # http://127.0.0.1:5173
```

## API
- GET    /api/devices
- POST   /api/devices
- GET    /api/devices/{id}
- PUT    /api/devices/{id}
- DELETE /api/devices/{id}


## Docker Compose (optional)
```bash
docker compose up --build
# Frontend: http://127.0.0.1:5173
# Backend API: http://127.0.0.1:8000/api
```

## GitHub Actions CI
The workflow builds the frontend and sanity‑checks a Laravel instance by composing a fresh app and overlaying the backend overrides in this repo.
