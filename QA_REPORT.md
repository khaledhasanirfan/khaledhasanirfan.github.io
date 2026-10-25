# Validation and review — 25 October 2026

## Result

The dark redesign is implemented on `codex/academic-portfolio-redesign` for owner review. The live GitHub Pages configuration remains **`main:/docs`**. No production deployment or Pages settings change has been performed.

## Automated checks

All passed on the final source:

- `npm run build`: 15 static pages, RSS feeds, sitemap, robots.txt; no published essay or life-story bodies have been invented.
- `npm run check`: every generated HTML page; internal links and anchors; referenced CSS assets/fonts; image alt text; main landmarks; one h1 per page; page titles/descriptions/canonical URLs; valid feed/sitemap XML; unique published DOIs; substantive PDF CV; WCAG AA contrast for core dark-theme text, links, metadata, status and button colors.
- `npm test`: isolated end-to-end content-publishing test for essays and photo stories, including escaped Markdown, nested paths, complete rendered content, draft exclusion, RSS/sitemap inclusion, gallery output, withdrawn-page removal, and rejected directory traversal. Temporary sample content never enters the real website.
- `git diff --check`: no whitespace errors.

## Browser checks

Chrome browser inspection through the supported browser tool:

- **60 page/viewport combinations:** all 15 pages at actual 320, 390, 768, and 1440 pixel viewport widths. No horizontal overflow, missing h1, or broken loaded images. Exact observed viewport dimensions are recorded in `review/responsive-checks.json`.
- Desktop More navigation and mobile native Menu navigation; keyboard activation and Escape dismissal.
- Publication journal/conference filtering, title/author/year search, result announcements and empty-search state. The journal filter shows one published journal article; accepted/in-press and under-review sections remain separate.
- Project notes open/close using the keyboard, without requiring JavaScript.
- Image viewer opening, next-image navigation (8 project images), Escape dismissal, and focus restoration to the image link.
- Desktop and mobile visual inspection of Home, Publications, Projects, Writing, and Life & Travels.
- Transparent portrait alpha channel confirmed; the background-free portrait is derived from the original supplied photo. It is not a 3D avatar. CSS compositing, shadow and optional slight hover perspective supply depth.
- A lightweight static neural SVG supplies the visual background; it is decorative and excluded from the accessibility tree. No continuous animation or particle-rendering dependency runs.

This is a practical browser and static accessibility check, not a certification of complete WCAG conformance. No Lighthouse score, real-device performance measurement, screen-reader audit, or live production smoke test is claimed.

## Content and resource verification

- Verified GitHub Pages publishing source using the GitHub API.
- Reconciled latest supplied CVs, existing content, publisher-deposited Crossref records, and Google Scholar's four listed publications. Source notes and remaining citation differences are in `CONTENT_REVIEW.md`.
- IEEE PDF URLs and ACM/Elsevier full-text URLs are the actual links offered by Google Scholar. DOI links remain stable primary links. Publisher automation was blocked (403/418; ScienceDirect CAPTCHA), so direct file delivery/open-access license details could not be fully checked. These are not fabricated URLs.
- Four published DOI records are distinct. Web3/Web2 remains in press; the owner confirmed the Rooppur manuscript is still under review.
- Eight projects/ongoing investigations reflect the owner's requested selection. All newly generated illustrative images are labeled and have full prompts/provenance in `review/image-generation.json`; the portrait edit has separate provenance in `review/portrait-edit.json`.
- Current CV download is the primary-focus v1 supplied by the owner. The 670-byte placeholder was replaced, including the older `/cv.pdf` URL.

## Screenshots

Screenshots are local review evidence and are not deployed inside `docs/`.

| View | Before | After |
| --- | --- | --- |
| Home, desktop | `review/before-desktop.jpg` | `review/after-desktop.jpg` |
| Home, mobile | `review/before-mobile.jpg` | `review/after-mobile.jpg` |
| Home first screen | — | `review/after-desktop-hero.jpg`, `review/after-mobile-hero.jpg` |
| Publications | — | `review/publications-desktop.jpg`, `review/publications-mobile.jpg` |
| Projects | — | `review/projects-desktop.jpg`, `review/projects-mobile.jpg` |
| Writing | — | `review/writing-desktop.jpg`, `review/writing-mobile.jpg` |
| Life & Travels | — | `review/life-desktop.jpg`, `review/life-mobile.jpg` |

The before views show the original production site. Intermediate ivory designs were superseded by the owner's dark-theme request; after views show the final dark design.

## Preview and release

From the checkout:

```sh
npm run build
npm run dev
```

Open http://127.0.0.1:4173/. No package installation is required. The preview serves the actual `docs/` publishing output. Refresh after rebuilding content. Stop the preview after the review is complete.

Review the draft branch/PR and outstanding content questions before approving replacement of the live site. After approval, merge into `main`, then inspect the GitHub Pages deployment and live pages. The old site remains in Git history at `26627c4`; no replacement has been published by this work.
