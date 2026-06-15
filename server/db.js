// SQLite setup with better-sqlite3. The database file lives in /data.
import Database from 'better-sqlite3';
import { mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const dataDir = join(__dirname, '..', 'data');
mkdirSync(dataDir, { recursive: true });

const dbPath = process.env.DB_PATH || join(dataDir, 'portfolio.db');
export const db = new Database(dbPath);

db.pragma('journal_mode = WAL');

db.exec(`
  CREATE TABLE IF NOT EXISTS publications (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    venue TEXT,
    year INTEGER,
    doi TEXT,
    status TEXT,
    tags TEXT,
    position INTEGER
  );

  CREATE TABLE IF NOT EXISTS projects (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    role TEXT,
    summary TEXT,
    highlight TEXT,
    tags TEXT,
    position INTEGER
  );

  CREATE TABLE IF NOT EXISTS news (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    date TEXT,
    text TEXT NOT NULL,
    position INTEGER
  );

  CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    subject TEXT,
    message TEXT NOT NULL,
    created_at TEXT NOT NULL,
    ip TEXT
  );
`);
