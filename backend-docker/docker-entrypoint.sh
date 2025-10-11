#!/usr/bin/env bash
set -e

# If overrides exist, copy them into the Laravel project
if [ -d "/app/backend-overrides" ]; then
  echo "Applying backend overrides..."
  rsync -av --exclude='.env' /app/backend-overrides/ /app/backend/
fi

# SQLite DB
mkdir -p /app/backend/database
touch /app/backend/database/database.sqlite

# Env
if [ ! -f /app/backend/.env ]; then
  cp /app/backend/.env.example /app/backend/.env
fi

# Migrate
php /app/backend/artisan migrate --force || true

# Serve
php /app/backend/artisan serve --host=0.0.0.0 --port=${APP_PORT:-8000}
