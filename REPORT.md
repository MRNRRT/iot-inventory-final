# 7CS069/UZ1 – Web Technologies

**Roberto Marini — Student ID: 2544961**  
Date: 2025-10-10

IoT Device Inventory – Formative Prototype

Topic & purpose
“IoT Device Inventory” is a minimal full‑stack prototype to track Internet of Things assets (e.g., sensors, cameras, smart locks) with attributes such as name, type, location, and status. The aim is to demonstrate end‑to‑end data flow from an interactive web form to a RESTful API with persistent storage. The scope is intentionally focused to serve as a foundation for the summative: it already supports create/read/update/delete and can be extended with authentication, search/filtering, and analytics.

Technologies used & why
Frontend: React (Vite) for a fast development experience, component reuse, and state management using hooks. The interface includes a device form (create/update) and a responsive table for listing and managing devices.
Backend: Laravel 10 (PHP) provides structured routing, request validation, controllers, and Eloquent ORM for database access. SQLite is used for simplicity while remaining a real database engine, so data persists across sessions. CORS is enabled to allow the React dev server to call the API.
This stack matches the brief (JS client + PHP framework) and keeps a clean separation of concerns.

Client–server communication
The React client calls the API via a small fetch wrapper. Endpoints follow REST conventions exposed by Laravel’s apiResource routes:
• GET /api/devices – list
• POST /api/devices – create (validated)
• GET /api/devices/{id} – read
• PUT /api/devices/{id} – update
• DELETE /api/devices/{id} – delete
Errors (e.g., validation failures) are surfaced in a simple error banner. Data persists using SQLite so it survives restarts.

Challenges encountered & plans for the final
(1) CORS between Vite (port 5173) and Laravel (port 8000): resolved with Laravel CORS config to whitelist the frontend origin.
(2) Validation & UX: mapping Laravel validation messages to clear client feedback; currently a general error banner is used—final will include per‑field messages.
(3) Data shaping & scalability: migrations make schema evolution straightforward, but search/filter and large lists need pagination and indexes.
Planned for the final submission: authentication (Laravel Sanctum) and role‑based permissions; pagination and search by type/location; client‑side validation with per‑field messages; improved responsive design using a component library; optional CSV/JSON import‑export and basic charts.

Source code
Source is organised as backend/ (Laravel API) and frontend/ (React + Vite). A recommended Git workflow with regular commits, issues and a “Formative MVP” milestone is included in the README.