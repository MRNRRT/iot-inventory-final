FROM php:8.2-cli

RUN apt-get update && apt-get install -y \
    git unzip rsync libzip-dev libonig-dev libxml2-dev sqlite3 libsqlite3-dev \
 && docker-php-ext-install pdo pdo_sqlite

COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /app
RUN composer create-project --no-interaction --prefer-dist laravel/laravel backend
WORKDIR /app/backend

COPY ./backend-docker/docker-entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh

EXPOSE 8000
ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]
