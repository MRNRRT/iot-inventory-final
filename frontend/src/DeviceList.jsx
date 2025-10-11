import { useEffect, useMemo, useState } from "react";
import { api } from "./api";

export default function DeviceList() {
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);
  const [q, setQ] = useState("");

  async function load() {
    setLoading(true);
    setErr(null);
    try {
      const data = await api("/devices");
      setDevices(Array.isArray(data) ? data : []);
    } catch (e) {
      setErr(e.message || "Load error");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return devices;
    return devices.filter(d =>
      [d.name, d.type, d.location, d.status].some(v => String(v).toLowerCase().includes(s))
    );
  }, [q, devices]);

  async function onDelete(id) {
    if (!confirm("Delete this device?")) return;
    try {
      await api(`/devices/${id}`, { method: "DELETE" });
      setDevices(prev => prev.filter(d => d.id !== id));
    } catch (e) {
      alert(e.message || "Delete failed");
    }
  }

  if (loading) return <p>Loading…</p>;
  if (err) return <p className="text-red-600">Error: {err}</p>;

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <input
          value={q}
          onChange={e => setQ(e.target.value)}
          placeholder="Search name/type/location/status…"
          className="border rounded p-2 w-full"
        />
        <button onClick={load} className="border rounded px-3 py-2">Refresh</button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border">
          <thead className="bg-gray-50">
            <tr>
              <th className="border px-3 py-2 text-left">ID</th>
              <th className="border px-3 py-2 text-left">Name</th>
              <th className="border px-3 py-2 text-left">Type</th>
              <th className="border px-3 py-2 text-left">Location</th>
              <th className="border px-3 py-2 text-left">Status</th>
              <th className="border px-3 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(d => (
              <tr key={d.id}>
                <td className="border px-3 py-2">{d.id}</td>
                <td className="border px-3 py-2">{d.name}</td>
                <td className="border px-3 py-2">{d.type}</td>
                <td className="border px-3 py-2">{d.location}</td>
                <td className="border px-3 py-2">
                  <span className="inline-block rounded px-2 py-0.5 border text-sm">
                    {d.status}
                  </span>
                </td>
                <td className="border px-3 py-2 text-center">
                  <button
                    onClick={() => onDelete(d.id)}
                    className="border rounded px-2 py-1 hover:bg-gray-50"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center py-6 text-gray-500">
                  No devices
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
