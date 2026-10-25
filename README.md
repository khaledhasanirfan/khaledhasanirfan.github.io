# Khaled Hasan — Academic portfolio

A static academic portfolio, writing notebook, and life/photo journal for [khaledhasanirfan.github.io](https://khaledhasanirfan.github.io/).

## Production and review

GitHub Pages is configured to publish **`main` → `/docs`** (confirmed using the GitHub Pages API on 25 October 2026). The owner approved publication on **25 October 2026**, including green action buttons, brighter text, and purple highlights. The redesign was prepared on **`codex/academic-portfolio-redesign`** and released through pull request #2. Future changes should also be checked before merging into `main`.

## Preview

Node.js 18+ and Python 3 are sufficient. The static website needs **no package installation**, framework, backend, database, or credentials.

```sh
npm run build
npm run dev
```

Open **http://127.0.0.1:4173/**. `PORT=4174 npm run dev` uses another port. After changing content, run `npm run build` again and reload the browser. The preview serves `docs/`, including the actual deployment files. Stop the preview with Ctrl+C.

## Check changes

```sh
npm run build
npm run check
npm test
```

- `build`: generate static pages, essay/story pages, RSS, sitemap, and robots.txt from shared source content.
- `check`: check every generated HTML page, local link and anchor, descriptive image alt text, main landmarks, titles, descriptions, feeds, unique DOIs, CV file, and core AA color contrast.
- `test`: exercise publication of essay/story fixtures in an isolated temporary copy. Checks drafts, Markdown escaping, nested article links, galleries, RSS/sitemap inclusion, withdrawn-page cleanup, and path restrictions. It does not publish sample posts on the real site.

Commit both the edited source **and generated `docs/` output**. GitHub Pages serves the generated files; it does not run this custom build script.

## Structure

| Path | Purpose |
| --- | --- |
| `content/profile.json` | Biography, main research identity, contact/social links, CV/portrait paths, teaching philosophy, and personal interests |
| `content/research.json` | Connected research areas and ongoing investigations |
| `content/publications.json` | Verified published citations; source of the homepage and publication list |
| `content/pending-publications.json` | Accepted/in-press work and under-review manuscripts, kept separate |
| `content/projects.json` | Project roles, methods, outcomes, status, links, images and captions |
| `content/news.json` | Dated announcements shared by homepage and archive |
| `content/academic.json` | Education, employment, academic service, honors and teaching |
| `content/writing.json`, `content/writing/*.md` | Essay manifest and Markdown bodies |
| `content/life.json`, `content/life/*.md` | Life/travel story manifest and Markdown bodies |
| `scripts/build.mjs` | Shared page templates and conservative Markdown renderer |
| `scripts/preview.mjs` | Dependency-free local static server |
| `docs/` | Generated GitHub Pages website and static assets |
| `docs/assets/style.css`, `docs/assets/app.js` | Shared design and optional progressive interactions |
| `docs/assets/files/khaled-hasan-cv.pdf` | Current primary-focus academic CV |
| `CONTENT_GUIDE.md` | Step-by-step editing and publishing instructions |
| `CONTENT_REVIEW.md` | Source reconciliation and outstanding factual questions |
| `QA_REPORT.md`, `review/` | Validation, screenshots, publisher metadata, illustration provenance/prompts |

Content is in the HTML before JavaScript runs. JavaScript only adds search/filtering, menu enhancements, and a keyboard-accessible image dialog. Native navigation, article links, figures, and CV links work without JavaScript. Fonts are self-hosted with their licenses. WebP images reduce transfer size; below-the-fold images load lazily.

## Pages

Home, Research, Publications, Projects, Teaching, About, Contact, News, Writing, and Life & Travels. Individual essays and photo stories are generated when entries are marked `published`. Older Education, Experience, and Honors URLs remain useful as signposts to the corresponding About sections. The homepage provides the direct CV download; the old `cv.html` URL redirects there. A 404 page, sitemap, feeds, and sensible social/academic metadata are included.

## Deploy after approval

1. Review the draft pull request, screenshots, and `CONTENT_REVIEW.md`.
2. Complete any required factual corrections and run the checks above.
3. Commit regenerated output and push the review branch.
4. After explicit owner approval, merge into `main`.
5. GitHub Pages will rebuild from `main:/docs`. Confirm the Pages deployment succeeds and inspect the live site.

Do not switch Pages to the working branch to preview it: doing that would replace the live website before approval. To roll back a merged release, revert its merge commit through the normal review process; the original site remains in Git history at `26627c4`.

## Legacy implementation

`public/` and `server/` contain the previous optional Express/SQLite application. They are **not deployed by GitHub Pages**, were not redesigned, and are not the current source of truth. Existing dependencies in `package.json` are retained only for that optional application. To run it intentionally, install its dependencies with `npm install` and use `npm run legacy:start` (or `legacy:dev` / `legacy:seed`). Normal `npm start` now previews the actual static website. Do not edit `server/data.js` to update the public portfolio.
