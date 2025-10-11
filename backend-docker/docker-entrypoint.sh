#!/usr/bin/env bash
set -Eeuo pipefail

APP_DIR="/app/backend"

echo "Applying backend overrides..."
if [ -d "/app/backend-overrides" ]; then
  rsync -a --exclude '.env' /app/backend-overrides/ "$APP_DIR"/
fi

cd "$APP_DIR"

mkdir -p database
touch database/database.sqlite

if [ ! -f .env ]; then
  cp .env.example .env
fi

if ! grep -qE '^APP_KEY=.+$' .env || grep -q '^APP_KEY=$' .env; then
  php artisan key:generate --force
fi

php artisan migrate --force || true

php artisan config:clear >/dev/null 2>&1 || true
php artisan route:clear  >/dev/null 2>&1 || true
php artisan view:clear   >/dev/null 2>&1 || true

exec php artisan serve --host=0.0.0.0 --port="${APP_PORT:-8000}"
