# Khaled Hasan — Portfolio

Personal academic portfolio for Khaled Hasan, Lecturer in CSE at MIST, Dhaka.

**Live:** https://khaledhasanirfan.github.io

## What's here

- `docs/` — the live site. A single self-contained `index.html` (CSS + JS inline), images, and the CV. This is what GitHub Pages serves.
- `public/` + `server/` — an optional full-stack version (Express + SQLite) with a contact API, for running locally or on a server.

## Run the full-stack version

```bash
npm install
npm start        # http://localhost:3000
```

Content lives in `server/data.js`. Copy `.env.example` to `.env` to set `PORT`, `DB_PATH`, and `ADMIN_TOKEN`.

## Editing the live site

Edit `docs/index.html` and push to `main`. GitHub Pages redeploys automatically.
