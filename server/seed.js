// Seed the database from data.js. Safe to run repeatedly: it resets
// the content tables (publications, projects, news) but never touches messages.
import { db } from './db.js';
import { publications, projects, news } from './data.js';

const seed = db.transaction(() => {
  db.prepare('DELETE FROM publications').run();
  db.prepare('DELETE FROM projects').run();
  db.prepare('DELETE FROM news').run();

  const insPub = db.prepare(
    `INSERT INTO publications (title, venue, year, doi, status, tags, position)
     VALUES (@title, @venue, @year, @doi, @status, @tags, @position)`
  );
  publications.forEach((p, i) =>
    insPub.run({ ...p, tags: JSON.stringify(p.tags || []), position: i })
  );

  const insProj = db.prepare(
    `INSERT INTO projects (title, role, summary, highlight, tags, position)
     VALUES (@title, @role, @summary, @highlight, @tags, @position)`
  );
  projects.forEach((p, i) =>
    insProj.run({ ...p, tags: JSON.stringify(p.tags || []), position: i })
  );

  const insNews = db.prepare(
    `INSERT INTO news (date, text, position) VALUES (@date, @text, @position)`
  );
  news.forEach((n, i) => insNews.run({ ...n, position: i }));
});

seed();

console.log('Seeded:', {
  publications: db.prepare('SELECT COUNT(*) c FROM publications').get().c,
  projects: db.prepare('SELECT COUNT(*) c FROM projects').get().c,
  news: db.prepare('SELECT COUNT(*) c FROM news').get().c
});
