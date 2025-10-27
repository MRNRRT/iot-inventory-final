import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import DevicesPage from "./pages/DevicesPage.jsx";
import AboutPage from "./pages/AboutPage.jsx";

function Shell() {
  return (
    <BrowserRouter>
      <div
        style={{
          maxWidth: "900px",
          margin: "0 auto",
          padding: "1.5rem",
          display: "flex",
          flexDirection: "column",
          gap: "1.5rem",
        }}
      >
        <header
          style={{
            display: "flex",
            justifyContent: "space-between",
            borderBottom: "1px solid #d1d5db",
            paddingBottom: "0.75rem",
            alignItems: "baseline",
          }}
        >
          <h1 style={{ fontSize: "1.1rem", fontWeight: 600 }}>
            IoT Device Inventory
          </h1>
          <nav
            style={{
              display: "flex",
              gap: "1rem",
              fontSize: "0.9rem",
              textDecoration: "underline",
            }}
          >
            <Link to="/devices">Devices</Link>
            <Link to="/about">About</Link>
          </nav>
        </header>

        <Routes>
          <Route path="/" element={<DevicesPage />} />
          <Route path="/devices" element={<DevicesPage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>

        <footer
          style={{
            borderTop: "1px solid #d1d5db",
            paddingTop: "0.75rem",
            fontSize: "0.7rem",
            color: "#6b7280",
            textAlign: "center",
            lineHeight: 1.4,
          }}
        >
          ©2025 University of Wolverhampton – 7CS069/UZ1: Web Technologies – IoT Device Inventory – Roberto Marini (2544961)
        </footer>
      </div>
    </BrowserRouter>
  );
}

const root = createRoot(document.getElementById("root"));
root.render(<Shell />);