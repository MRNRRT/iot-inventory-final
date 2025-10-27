import React, { useEffect, useState } from "react";
import { api } from "./api.js";

export default function DeviceList() {
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name: "", type: "", location: "", status: "active" });

  async function loadDevices() {
    setLoading(true);
    try {
      const data = await api("/devices");
      setDevices(data);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  }

  useEffect(() => {
    loadDevices();
  }, []);

  async function handleDelete(id) {
    if (!window.confirm("Delete this device?")) return;
    await api(`/devices/${id}`, { method: "DELETE" });
    loadDevices();
  }

  function startEdit(device) {
    setEditing(device.id);
    setForm(device);
  }

  async function handleUpdate(e) {
    e.preventDefault();
    await api(`/devices/${editing}`, {
      method: "PUT",
      body: form,
    });
    setEditing(null);
    loadDevices();
  }

  if (loading) return <p>Loading...</p>;

  return (
    <section>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem" }}>
        <input
          type="text"
          placeholder="Search name/type/location/status"
          onChange={(e) => {
            const q = e.target.value.toLowerCase();
            const filtered = devices.filter(
              (d) =>
                d.name.toLowerCase().includes(q) ||
                d.type.toLowerCase().includes(q) ||
                d.location.toLowerCase().includes(q) ||
                d.status.toLowerCase().includes(q)
            );
            setDevices(q ? filtered : devices);
          }}
          style={{ border: "1px solid #d1d5db", borderRadius: "0.4rem", padding: "0.3rem" }}
        />
        <button
          onClick={loadDevices}
          style={{
            border: "1px solid #4b5563",
            borderRadius: "0.4rem",
            padding: "0.3rem 0.75rem",
            backgroundColor: "#fff",
          }}
        >
          Refresh
        </button>
      </div>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          fontSize: "0.9rem",
        }}
      >
        <thead>
          <tr style={{ borderBottom: "1px solid #d1d5db" }}>
            <th style={{ textAlign: "left" }}>ID</th>
            <th>Name</th>
            <th>Type</th>
            <th>Location</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {devices.map((device) => (
            <tr key={device.id} style={{ borderBottom: "1px solid #eee" }}>
              <td>{device.id}</td>
              <td>{device.name}</td>
              <td>{device.type}</td>
              <td>{device.location}</td>
              <td>{device.status}</td>
              <td>
                <button
                  onClick={() => startEdit(device)}
                  style={{
                    border: "1px solid #6b7280",
                    borderRadius: "0.4rem",
                    marginRight: "0.5rem",
                    padding: "0.3rem 0.5rem",
                  }}
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(device.id)}
                  style={{
                    border: "1px solid #b91c1c",
                    borderRadius: "0.4rem",
                    color: "#b91c1c",
                    padding: "0.3rem 0.5rem",
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editing && (
        <form
          onSubmit={handleUpdate}
          style={{
            border: "1px solid #d1d5db",
            borderRadius: "0.5rem",
            padding: "1rem",
            marginTop: "1.5rem",
            fontSize: "0.9rem",
          }}
        >
          <h3 style={{ marginBottom: "1rem" }}>Edit Device #{editing}</h3>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px,1fr))",
              gap: "1rem",
            }}
          >
            <label>
              Name
              <input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                style={{ width: "100%", border: "1px solid #d1d5db", borderRadius: "0.4rem", padding: "0.4rem" }}
              />
            </label>
            <label>
              Type
              <input
                value={form.type}
                onChange={(e) => setForm({ ...form, type: e.target.value })}
                style={{ width: "100%", border: "1px solid #d1d5db", borderRadius: "0.4rem", padding: "0.4rem" }}
              />
            </label>
            <label>
              Location
              <input
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
                style={{ width: "100%", border: "1px solid #d1d5db", borderRadius: "0.4rem", padding: "0.4rem" }}
              />
            </label>
            <label>
              Status
              <select
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
                style={{ width: "100%", border: "1px solid #d1d5db", borderRadius: "0.4rem", padding: "0.4rem" }}
              >
                <option value="active">active</option>
                <option value="inactive">inactive</option>
                <option value="maintenance">maintenance</option>
              </select>
            </label>
          </div>
          <div style={{ marginTop: "1rem" }}>
            <button
              type="submit"
              style={{
                border: "1px solid #4b5563",
                borderRadius: "0.4rem",
                padding: "0.3rem 0.75rem",
                backgroundColor: "#fff",
              }}
            >
              Save
            </button>
            <button
              type="button"
              onClick={() => setEditing(null)}
              style={{
                marginLeft: "0.5rem",
                border: "1px solid #9ca3af",
                borderRadius: "0.4rem",
                padding: "0.3rem 0.75rem",
                backgroundColor: "#fff",
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </section>
  );
}