import React, { useState } from "react";
import DeviceList from "../DeviceList.jsx";
import { api } from "../api.js";

// This page shows the CRUD UI for devices.
// It includes a "toast" success message and basic validation.

export default function DevicesPage() {
  const [successMsg, setSuccessMsg] = useState("");

  async function handleCreate(newDevice) {
    try {
      await api("/devices", {
        method: "POST",
        body: newDevice,
      });

      setSuccessMsg("Device created successfully.");
      setTimeout(() => setSuccessMsg(""), 3000); // auto-hide after 3s
    } catch (err) {
      alert(err.message || "Failed to create device");
    }
  }

  return (
    <section style={{ display: "grid", gap: "1.5rem" }}>
      <h2 style={{ fontWeight: 600, fontSize: "1.1rem" }}>IoT Devices</h2>

      {successMsg && (
        <div
          style={{
            border: "1px solid #16a34a",
            backgroundColor: "#ecfdf5",
            color: "#065f46",
            fontSize: "0.9rem",
            padding: "0.5rem 0.75rem",
            borderRadius: "0.4rem",
          }}
        >
          {successMsg}
        </div>
      )}

      <NewDeviceForm onCreate={handleCreate} />

      <DeviceList />
    </section>
  );
}

// This is the "Add Device" form.
// It includes simple client-side validation (name/type required).
function NewDeviceForm({ onCreate }) {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [location, setLocation] = useState("");
  const [status, setStatus] = useState("active");
  const [error, setError] = useState("");

  async function submit(e) {
    e.preventDefault();

    if (!name.trim() || !type.trim()) {
      setError("Name and Type are required.");
      return;
    }

    setError("");

    await onCreate({
      name,
      type,
      location,
      status,
    });

    // reset
    setName("");
    setType("");
    setLocation("");
    setStatus("active");
  }

  return (
    <form
      onSubmit={submit}
      style={{
        border: "1px solid #d1d5db",
        borderRadius: "0.5rem",
        padding: "1rem",
        fontSize: "0.9rem",
        display: "grid",
        gap: "1rem",
      }}
    >
      <h3 style={{ fontWeight: 600, marginBottom: "0.5rem" }}>Add Device</h3>

      {error && (
        <div
          style={{
            border: "1px solid #dc2626",
            backgroundColor: "#fef2f2",
            color: "#991b1b",
            fontSize: "0.9rem",
            padding: "0.5rem 0.75rem",
            borderRadius: "0.4rem",
          }}
        >
          {error}
        </div>
      )}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px,1fr))",
          gap: "1rem",
        }}
      >
        <label style={{ display: "flex", flexDirection: "column" }}>
          Name *
          <input
            style={{
              border: "1px solid #d1d5db",
              borderRadius: "0.4rem",
              padding: "0.5rem",
            }}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Thermostat 1"
          />
        </label>

        <label style={{ display: "flex", flexDirection: "column" }}>
          Type *
          <input
            style={{
              border: "1px solid #d1d5db",
              borderRadius: "0.4rem",
              padding: "0.5rem",
            }}
            value={type}
            onChange={(e) => setType(e.target.value)}
            placeholder="Wireless"
          />
        </label>

        <label style={{ display: "flex", flexDirection: "column" }}>
          Location
          <input
            style={{
              border: "1px solid #d1d5db",
              borderRadius: "0.4rem",
              padding: "0.5rem",
            }}
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Bedroom"
          />
        </label>

        <label style={{ display: "flex", flexDirection: "column" }}>
          Status
          <select
            style={{
              border: "1px solid #d1d5db",
              borderRadius: "0.4rem",
              padding: "0.5rem",
            }}
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="active">active</option>
            <option value="inactive">inactive</option>
            <option value="maintenance">maintenance</option>
          </select>
        </label>
      </div>

      <button
        type="submit"
        style={{
          border: "1px solid #4b5563",
          borderRadius: "0.4rem",
          padding: "0.5rem 0.75rem",
          backgroundColor: "#fff",
          fontSize: "0.9rem",
        }}
      >
        Create
      </button>
    </form>
  );
}