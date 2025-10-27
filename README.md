# IoT Device Inventory – Final Assessment (7CS069/UZ1)

Full-stack web application developed by **Roberto Marini (2544961)** for the **University of Wolverhampton – Web Technologies (7CS069/UZ1)** module.  
The project integrates **React (Vite)** + **Laravel 10** with **SQLite** persistence, using **Docker Compose** for containerized deployment.

## Quick Start
Backend:
```bash
cd backend
cp .env.example .env
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
- GET    /api/health
- GET    /api/devices
- POST   /api/devices
- PUT    /api/devices/{id}
- DELETE /api/devices/{id}


## Docker Compose
```bash
docker compose up --build
# Frontend: http://127.0.0.1:5173
# Backend API: http://127.0.0.1:8000/api
# SQLite persistence: storage/sqlite/database.sqlite
```

## Automated Testing
```bash
docker exec -it iot_backend php artisan test
Runs feature tests to verify API availability and JSON response structure (see tests/Feature/DevicesTest.php)
```

## Performance Optimization
Frontend and backend performance analyzed using Google Lighthouse, achieving 100/100 in Performance and Accessibility

## Author
©2025 University of Wolverhampton - Roberto Marini (2544961)
