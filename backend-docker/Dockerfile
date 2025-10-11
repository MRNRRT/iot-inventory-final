# Simple Laravel dev image using PHP 8.2 + Composer
FROM php:8.2-cli

RUN apt-get update && apt-get install -y     git unzip rsync libzip-dev libonig-dev libxml2-dev sqlite3 libsqlite3-dev &&     docker-php-ext-install pdo pdo_sqlite

# Install Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# Create Laravel app
WORKDIR /app
RUN composer create-project laravel/laravel backend
WORKDIR /app/backend

# Copy our overrides (model/controller/migration/routes/config/.env.example) if present
# At runtime, docker-compose mounts ./backend into /app/backend-overrides (read-only).
# We patch-copy on container start.
COPY ./backend-docker/docker-entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh

EXPOSE 8000
ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]
