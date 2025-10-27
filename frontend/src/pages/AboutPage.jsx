import React from "react";

export default function AboutPage() {
  return (
    <section style={{ display: "grid", gap: "1rem" }}>
      <h2 style={{ fontWeight: 600, fontSize: "1.1rem" }}>
        About This Prototype
      </h2>

      <p style={{ fontSize: "0.9rem", lineHeight: 1.5 }}>
        This IoT Device Inventory prototype demonstrates a modern full-stack
        web application. The frontend is built with React and Vite, the backend
        is built with Laravel, and data is stored persistently using SQLite.
        Both services run in Docker containers and communicate through a
        RESTful API.
      </p>

      <p style={{ fontSize: "0.9rem", lineHeight: 1.5 }}>
        The system allows creating, editing and deleting IoT devices such as
        sensors, thermostats and cameras. It is designed to evidence module
        outcomes: client–server communication, persistent storage, CORS,
        deployment using Docker, and performance optimisation using Lighthouse.
      </p>

      <p
        style={{
          fontSize: "0.7rem",
          color: "#6b7280",
        }}
      >
        Version 1.0 – Final Assessment Build
      </p>
    </section>
  );
}