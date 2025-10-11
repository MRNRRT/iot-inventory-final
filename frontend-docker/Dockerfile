FROM node:20-alpine
WORKDIR /app
COPY ./frontend /app
RUN npm install && npm run build || true
# dev server for convenience
EXPOSE 5173
CMD ["npm", "run", "dev", "--", "--host","0.0.0.0","--port","5173"]
