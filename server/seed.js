// Seed the database from data.js. Safe to run repeatedly: it resets
// the content tables (publications, projects, news) but never touches messages.
import { db } from './db.js';
import { publications, projects, news } from './data.js';

db.exec('DELETE FROM publications; DELETE FROM projects; DELETE FROM news;');

const insPub = db.prepare(
  `INSERT INTO publications (title, venue, year, doi, status, tags, position)
   VALUES (?, ?, ?, ?, ?, ?, ?)`
);
publications.forEach((p, i) =>
  insPub.run(p.title, p.venue, p.year, p.doi, p.status, JSON.stringify(p.tags || []), i)
);

const insProj = db.prepare(
  `INSERT INTO projects (title, role, summary, highlight, tags, position)
   VALUES (?, ?, ?, ?, ?, ?)`
);
projects.forEach((p, i) =>
  insProj.run(p.title, p.role, p.summary, p.highlight, JSON.stringify(p.tags || []), i)
);

const insNews = db.prepare(
  `INSERT INTO news (date, text, position) VALUES (?, ?, ?)`
);
news.forEach((n, i) => insNews.run(n.date, n.text, i));

console.log('Seeded:', {
  publications: db.prepare('SELECT COUNT(*) c FROM publications').get().c,
  projects: db.prepare('SELECT COUNT(*) c FROM projects').get().c,
  news: db.prepare('SELECT COUNT(*) c FROM news').get().c
});
