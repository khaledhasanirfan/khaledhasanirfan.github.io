import express from 'express';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { db } from './db.js';
import {
  profile,
  researchAreas,
  courses,
  teachingRoles,
  about
} from './data.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = join(__dirname, '..', 'public');

const app = express();
app.disable('x-powered-by');
app.use(express.json({ limit: '16kb' }));

// Auto-seed content tables on first boot so the API is never empty.
if (db.prepare('SELECT COUNT(*) c FROM publications').get().c === 0) {
  await import('./seed.js');
}

const parseTags = (row) => ({ ...row, tags: JSON.parse(row.tags || '[]') });

// --- Read API: site content ---
app.get('/api/profile', (_req, res) => {
  res.json({ profile, researchAreas, about, courses, teachingRoles });
});

app.get('/api/publications', (_req, res) => {
  const rows = db
    .prepare('SELECT title, venue, year, doi, status, tags FROM publications ORDER BY position')
    .all()
    .map(parseTags);
  res.json(rows);
});

app.get('/api/projects', (_req, res) => {
  const rows = db
    .prepare('SELECT title, role, summary, highlight, tags FROM projects ORDER BY position')
    .all()
    .map(parseTags);
  res.json(rows);
});

app.get('/api/news', (_req, res) => {
  const rows = db.prepare('SELECT date, text FROM news ORDER BY position').all();
  res.json(rows);
});

// --- Write API: contact form ---
// Simple in-memory rate limit: 5 submissions per IP per 10 minutes.
const hits = new Map();
const WINDOW = 10 * 60 * 1000;
const LIMIT = 5;

function rateLimited(ip) {
  const now = Date.now();
  const list = (hits.get(ip) || []).filter((t) => now - t < WINDOW);
  list.push(now);
  hits.set(ip, list);
  return list.length > LIMIT;
}

const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

app.post('/api/contact', (req, res) => {
  const ip = req.headers['x-forwarded-for']?.split(',')[0]?.trim() || req.ip;
  if (rateLimited(ip)) {
    return res.status(429).json({ ok: false, error: 'Too many messages. Please try again later.' });
  }

  const name = String(req.body?.name || '').trim();
  const email = String(req.body?.email || '').trim();
  const subject = String(req.body?.subject || '').trim();
  const message = String(req.body?.message || '').trim();

  const errors = [];
  if (name.length < 2 || name.length > 120) errors.push('Please enter your name.');
  if (!isEmail(email)) errors.push('Please enter a valid email.');
  if (message.length < 10 || message.length > 4000) errors.push('Message should be 10 to 4000 characters.');
  if (errors.length) return res.status(400).json({ ok: false, error: errors.join(' ') });

  db.prepare(
    `INSERT INTO messages (name, email, subject, message, created_at, ip)
     VALUES (?, ?, ?, ?, ?, ?)`
  ).run(name, email, subject.slice(0, 200), message, new Date().toISOString(), ip);

  res.status(201).json({ ok: true, message: 'Thanks. Your message reached Khaled.' });
});

// --- Protected admin read of messages ---
app.get('/api/messages', (req, res) => {
  const token = process.env.ADMIN_TOKEN;
  if (!token || req.headers.authorization !== `Bearer ${token}`) {
    return res.status(401).json({ ok: false, error: 'Unauthorized' });
  }
  const rows = db.prepare('SELECT * FROM messages ORDER BY created_at DESC').all();
  res.json(rows);
});

app.get('/api/health', (_req, res) => res.json({ ok: true, uptime: process.uptime() }));

// --- Static frontend ---
app.use(express.static(publicDir, { extensions: ['html'] }));

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Portfolio running at http://localhost:${port}`);
});
