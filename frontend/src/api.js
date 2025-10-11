// frontend/src/api.js
const API_BASE = import.meta.env.VITE_API_BASE || 'http://127.0.0.1:8000/api';

/**
 * Smart fetch wrapper:
 * - Handles 204/205 No Content
 * - Parses JSON only when present
 * - Falls back to text for non-JSON responses
 * - Better error messages
 */
export async function api(path, { method = 'GET', body } = {}) {
  const opts = {
    method,
    headers: { 'Content-Type': 'application/json' },
  };
  if (body != null) opts.body = JSON.stringify(body);

  let res;
  try {
    res = await fetch(`${API_BASE}${path}`, opts);
  } catch (e) {
    throw new Error(`Network error: ${e?.message || 'failed to fetch'}`);
  }

  // Helper to safely parse JSON (without throwing on empty body)
  const parseJsonSafe = async (response) => {
    const text = await response.text(); // read once
    if (!text) return null;             // empty body
    try {
      return JSON.parse(text);
    } catch {
      // Not valid JSON; return raw text
      return text;
    }
  };

  // Error branch: build a helpful message
  if (!res.ok) {
    let msg = `HTTP ${res.status}`;
    try {
      const data = await parseJsonSafe(res);
      if (data && typeof data === 'object') {
        msg = data.message || data.error || msg;
      } else if (typeof data === 'string' && data.trim()) {
        msg = data;
      }
    } catch {
      // ignore, keep default msg
    }
    throw new Error(msg);
  }

  // Success branch:
  if (res.status === 204 || res.status === 205) {
    return null; // no content by definition
  }

  const contentType = res.headers.get('content-type') || '';
  // Try to parse JSON when content-type hints JSON; else return text or null
  if (contentType.includes('application/json')) {
    return await parseJsonSafe(res);
  }
  const maybeText = await res.text();
  return maybeText || null;
}
