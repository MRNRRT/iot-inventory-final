import { useEffect, useState } from 'react'
import { api } from './api'

function DeviceForm({ initial, onSubmit, onCancel }) {
  const [form, setForm] = useState(initial || { name:'', type:'', location:'', status:'active' })
  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value })
  const submit = (e) => { e.preventDefault(); onSubmit(form) }
  return (
    <form onSubmit={submit} className="max-w-xl mx-auto p-4 border rounded">
      <h2>{initial ? 'Edit Device' : 'Add Device'}</h2>
      <label>Name<input name="name" value={form.name} onChange={update} required/></label>
      <label>Type<input name="type" value={form.type} onChange={update} required/></label>
      <label>Location<input name="location" value={form.location} onChange={update} required/></label>
      <label>Status<select name="status" value={form.status} onChange={update}>
        <option value="active">active</option>
        <option value="inactive">inactive</option>
      </select></label>
      <div style={{ display:'flex', gap:8 }}>
        <button type="submit">{initial ? 'Update' : 'Create'}</button>
        {onCancel && <button type="button" onClick={onCancel}>Cancel</button>}
      </div>
    </form>
  )
}

export default function App() {
  const [devices, setDevices] = useState([])
  const [editing, setEditing] = useState(null)
  const [error, setError] = useState('')
  const [showAbout, setShowAbout] = useState(false)

  async function load() {
    try { setDevices(await api('/devices')) }
    catch (e) { setError(String(e.message || e)) }
  }
  useEffect(() => { load() }, [])

  async function createDevice(data) {
    try { await api('/devices', { method:'POST', body:data }); setError(''); setEditing(null); await load() }
    catch (e) { setError(String(e.message || e)) }
  }

  async function updateDevice(id, data) {
    try { await api(`/devices/${id}`, { method:'PUT', body:data }); setError(''); setEditing(null); await load() }
    catch (e) { setError(String(e.message || e)) }
  }

  async function deleteDevice(id) {
    if (!confirm('Delete this device?')) return
    try { await api(`/devices/${id}`, { method:'DELETE' }); await load() }
    catch (e) { setError(String(e.message || e)) }
  }

  return (
    <div style={{ maxWidth:900, margin:'0 auto', padding:16 }}>
      <header style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
        <h1>IoT Device Inventory</h1>
        <small>Full‑stack prototype (React + Laravel)</small>
        <button onClick={()=>setShowAbout(true)}>About</button>
      </header>

      {error && <p style={{ color:'red' }}>{error}</p>}

      {editing ? (
        <DeviceForm initial={editing} onSubmit={(data)=>updateDevice(editing.id, data)} onCancel={()=>setEditing(null)} />
      ) : (
        <DeviceForm onSubmit={createDevice} />
      )}

      <section style={{ marginTop:24 }}>
        <h2>Devices</h2>
        <div style={{ overflowX:'auto' }}>
          <table>
            <thead>
              <tr>
                <th>ID</th><th>Name</th><th>Type</th><th>Location</th><th>Status</th><th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {devices.map(d => (
                <tr key={d.id}>
                  <td>{d.id}</td>
                  <td>{d.name}</td>
                  <td>{d.type}</td>
                  <td>{d.location}</td>
                  <td>{d.status}</td>
                  <td>
                    <button onClick={()=>setEditing(d)}>Edit</button>
                    <button onClick={()=>deleteDevice(d.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      
      {showAbout && (
        <div className="modal-overlay" onClick={()=>setShowAbout(false)}>
          <div className="modal" onClick={(e)=>e.stopPropagation()}>
            <h3>About this prototype</h3>
            <p><strong>Student:</strong> Roberto Marini (2544961)</p>
            <p><strong>Module:</strong> 7CS069/UZ1 – Web Technologies</p>
            <p><strong>Stack:</strong> React (Vite) + Laravel 10 (SQLite)</p>
            <p>This is the formative full‑stack prototype demonstrating CRUD, validation and persistence.</p>
            <div style={{textAlign:'right', marginTop:16}}>
              <button onClick={()=>setShowAbout(false)}>Close</button>
            </div>
          </div>
        </div>
      )}
    
      <footer style={{ marginTop:32, textAlign:"center" }}>
        <small>© 2025 IoT Inventory — Formative demo | Roberto Marini (2544961) | Module: 7CS069/UZ1 – Web Technologies</small>
      </footer>
    </div>
  )
}
