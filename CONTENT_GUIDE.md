# Updating the website

Edit the source files under `content/`, run `npm run build`, and preview with `npm run dev`. Always commit the regenerated HTML/feed files in `docs/` together with the source changes.

## Add a publication

Add a record to `content/publications.json`. Copy the **complete exact author order and title** from the publisher. Your name is highlighted automatically when it is `Khaled Hasan` or `Khaled Hasan Irfan`.

```json
{
  "id": "a-new-paper",
  "title": "Exact publisher title",
  "authors": ["Khaled Hasan", "Full Coauthor Name"],
  "year": 2027,
  "status": "published",
  "type": "conference",
  "venue": "Exact conference proceedings title",
  "doi": "10.xxxx/replace-with-actual-doi",
  "pages": "1-10",
  "summary": "A precise one-sentence contribution, with no unsupported results.",
  "selected": false,
  "source": "https://publisher.example/verified-record"
}
```

This is a schema example, not a real paper. Optional fields: `volume`, `articleNumber`, `pdf`, `fulltext`, `code`, `award`, `awardUrl`, `image`, `imageAlt`, `imageCaption`. Omit unavailable links; never use `#` as a fake resource link. `selected: true` adds it to the homepage. Keep three or four selected works for readability. The list automatically groups published citations by year, newest first.

## Accepted → published

Accepted/in-press papers live in `content/pending-publications.json`. Once a publisher record exists, remove its pending record and add a complete record to `content/publications.json` with `status: "published"`. Do not leave the same work in both files. Under-review papers remain in the pending file with `status: "under-review"`. Never count an under-review manuscript as a published paper. Add a separate dated news entry if appropriate.

## News

Add to `content/news.json`:

```json
{
  "date": "2026-10",
  "text": "One verified announcement.",
  "url": "publications.html#existing-paper-id",
  "source": "Record how the date and announcement were verified."
}
```

Use `YYYY-MM` (or `YYYY-MM-DD`) with a verified month. The newest five entries appear on Home; all entries appear in News. No duplicate HTML editing is needed.

## CV, portrait, and contact

- Replace `docs/assets/files/khaled-hasan-cv.pdf` with the new general academic CV. Update `docs/cv.pdf` too to preserve that old public download URL. The current PDF is v1 supplied for this redesign; alternate targeted CVs are not exposed in the navigation.
- To change the filename, edit `cv` in `content/profile.json`. The homepage Download CV button links directly to this PDF. There is no separate CV content page; the old `cv.html` bookmark redirects to `index.html#cv`.
- Replace `docs/assets/images/portrait.webp`, or change `portrait` and `portraitAlt` in the profile file. Preserve a real photograph. Around 900–1200px wide is sufficient; export an efficient WebP.
- Edit email, affiliation, social links, biography, Ph.D. opportunity wording, and personal interests in `content/profile.json`. The header, footer, and contact links use this source.
- Edit education, experience, awards, service and course lists in `content/academic.json`.

## Project or ongoing research

Add/edit `content/projects.json`; use the existing records as the schema. Give each entry a stable lowercase hyphenated `id`, title, status, period, category, summary, problem, contribution, methods, outcome, and links. `selected: true` adds it to the homepage. Be precise about individual and team contributions. Completed prototypes and ongoing research have different status labels.

For authentic images, provide `image`, `imageAlt`, and `imageCaption` with the asset path relative to `docs/`, for example `assets/images/your-project.webp`. For a generated concept image also use `imageKind: "concept"` and a caption beginning **AI-generated concept illustration**. Do not use an illustration as proof of a system implementation or an experiment. Remove `imageKind: "concept"` only after replacing it with a genuine artifact and updating the caption.

Research areas and ongoing investigations are in `content/research.json`. Each area can link to publication IDs and project IDs. Update these references if you remove or rename a project. Individual ongoing investigations support `image`, `imageAlt`, and `imageCaption` too.

## Publish an essay

1. Create `content/writing/my-first-essay.md` with the essay body.
2. Add its metadata to `content/writing.json`:

```json
{
  "slug": "my-first-essay",
  "title": "Your actual essay title",
  "date": "2026-10-25",
  "category": "Research notes",
  "summary": "A short description in your own words.",
  "tags": ["AI", "Learning"],
  "status": "draft",
  "file": "my-first-essay.md"
}
```

3. Review the text and change `status` to `published` when ready. Drafts do not appear in HTML, lists, feeds, or the sitemap. Untracked/private draft text should remain outside this public repository: a draft committed to Git is still visible in repository source even though it is excluded from the website.
4. Build. The essay appears at `writing/my-first-essay.html`, in the Writing index, category filters, search, RSS feed, and sitemap. Reading time is computed automatically.

Optional cover metadata: `cover: "assets/images/essay-cover.webp"`, `coverAlt`, and `coverCaption`. Covers are optional: text-led essays have an intentional numbered layout.

Supported Markdown: paragraphs, headings (`##`, `###`), `**bold**`, `*emphasis*`, links, images, bullet lists, blockquotes, inline code, and fenced code blocks. The article title comes from metadata; do not repeat it as the first heading. Raw HTML is escaped. This is a small, intentional Markdown subset; tables, footnotes, inline mathematics and nested lists need a renderer enhancement rather than pasted HTML. Article image paths start at `assets/`, relative to `docs/`. Bangla/English prose can be stored as UTF-8; system font fallbacks handle glyphs outside the bundled Latin fonts.

## Add a life/travel photo story

Create the body in `content/life/a-real-journey.md` and a record in `content/life.json`. The same metadata works, with optional `location`, `gallery`, and photo captions:

```json
{
  "slug": "a-real-journey",
  "title": "The actual trip or moment",
  "date": "2026-10-25",
  "category": "Travel journals",
  "summary": "A short introduction to this real story.",
  "status": "draft",
  "file": "a-real-journey.md",
  "location": "Your actual location",
  "cover": "assets/images/life/your-photo.webp",
  "coverAlt": "Describe what the real photograph shows.",
  "coverCaption": "Where/when it was taken; photo credit if needed.",
  "gallery": [
    {
      "src": "assets/images/life/your-second-photo.webp",
      "alt": "A useful description for someone who cannot see the image.",
      "caption": "Your memory or factual context."
    }
  ]
}
```

Put the actual photographs in `docs/assets/images/life/`. The example filenames above do not exist; replace them with supplied photographs before publishing. Suggested categories: Travel journals, Food & local flavors, Sports, Everyday life. Categories are derived from real entries, not hardcoded. Clicking gallery photos opens a dialog with previous/next controls and Escape support; without JavaScript the original image link still works. Individual stories have their own URL, reading layout, and neighboring-story navigation.

There are currently **no published essays or life stories**. The introductory personal copy reflects the interests you supplied; it does not invent events. Do not add invented dates or claim generated travel images depict your own trips.

## Remove or withdraw an article

Change its status to `draft` or remove its manifest record and build again. The generator removes stale generated pages from `docs/writing/` and `docs/life/`, and updates feeds and sitemap. It owns those two article directories: do not place handwritten HTML there. This removes the current website entry, not historical Git commits or third-party caches.

## Final routine

```sh
npm run build
npm run check
npm test
```

Review the browser preview at phone and desktop sizes. Commit the source, generated pages, assets, and any updated review notes to the working branch. Approval is required before merging this replacement into the live `main` branch, as requested in the redesign brief.

## Dark theme and portrait depth

The current design uses Manrope headings and IBM Plex Sans body text, self-hosted in `docs/assets/fonts/`. The CSS palette is centralized in custom properties. `docs/assets/neural-field.svg` is a lightweight decorative network, hidden from accessibility tools; it does not represent an experimental model. The background is static, and the site respects reduced-motion preferences.

The homepage uses `portraitCutout` from `content/profile.json`. Its current transparent WebP is an AI-assisted background-removal edit of the supplied photograph. Replace it with a professionally masked transparent portrait when available; preserve the alpha channel. `portrait` still selects the original photographic version for About/Life and sharing metadata. No 3D face or invented portrait is used; depth is provided by compositing, a soft shadow, and the neural backdrop.

Project entries are editorial list rows with an optional thumbnail. Their “Project notes” disclosure exposes problem/contribution/method/outcome text, works without JavaScript, and keeps the full project list scannable. Publication rows remain fully visible rather than hidden behind disclosures.
