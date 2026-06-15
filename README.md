# Khaled Hasan | Personal Academic Portfolio

A full-stack personal portfolio for Khaled Hasan, Lecturer in CSE at MIST, Dhaka, and researcher in Human-Centered Trustworthy Agentic AI.

Dark, modern, animated. Built with a static frontend, an Express API, and a SQLite database.

## Stack

- **Frontend**: Semantic HTML5, plain CSS, and vanilla JavaScript. No build step. Google Fonts only. Scroll reveals use the IntersectionObserver API and respect `prefers-reduced-motion`.
- **Backend**: Node.js with Express. Serves the site and a small REST API.
- **Database**: SQLite through `better-sqlite3`. Stores site content and contact messages.

## Design notes

- Theme: deep navy near-black with an electric indigo and cool teal accent.
- Type: Sora for display, Inter for body, JetBrains Mono for labels and the DOI badges.
- Signature element: a fixed vertical **section spine** on the left of wide screens. It numbers each section in monospace and tracks your position as you scroll, like the margin index of a research paper. Publications also get a distinct card treatment with a colored left rail and a monospace DOI badge.

## Run it

```bash
npm install
npm run seed   # optional: the server also auto-seeds on first boot
npm start
```

Then open http://localhost:3000

For live reload during development:

```bash
npm run dev
```

## API

| Method | Route                | Description                                  |
| ------ | -------------------- | -------------------------------------------- |
| GET    | `/api/profile`       | Profile, research areas, about, teaching     |
| GET    | `/api/publications`  | Publication list                             |
| GET    | `/api/projects`      | Projects and achievements                    |
| GET    | `/api/news`          | News and updates                             |
| POST   | `/api/contact`       | Submit a contact message (validated, rate limited) |
| GET    | `/api/messages`      | Read messages (needs `Authorization: Bearer <ADMIN_TOKEN>`) |
| GET    | `/api/health`        | Health check                                 |

The frontend loads publications, projects, and news from this API, so the page stays data-driven. All content lives in `server/data.js`.

## Configuration

Copy `.env.example` to `.env` to set `PORT`, `DB_PATH`, and `ADMIN_TOKEN`.

## Things to replace

- `public/cv.pdf`: placeholder. Drop in the real CV.
- GitHub, Google Scholar, and LinkedIn links: currently `#` placeholders in `public/index.html` and `server/data.js`.

## Project layout

```
public/        Frontend (index.html, styles.css, script.js, cv.pdf)
server/        Express app, SQLite setup, seed script, content data
data/          SQLite database file (created at runtime, gitignored)
```
