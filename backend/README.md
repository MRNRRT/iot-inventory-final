# Backend (Laravel 10 API)

## Prerequisites
- PHP 8.2+, Composer

## Setup
```bash
composer create-project laravel/laravel .
composer require fruitcake/laravel-cors
# copy the provided files in this folder structure into the fresh Laravel project
touch database/database.sqlite
php artisan migrate
php artisan serve --host=127.0.0.1 --port=8000
```
API base: http://127.0.0.1:8000/api

## Routes
- GET    /api/devices
- POST   /api/devices
- GET    /api/devices/{id}
- PUT    /api/devices/{id}
- DELETE /api/devices/{id}
