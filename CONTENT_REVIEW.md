# Content review — 25 October 2026

The replacement is being prepared on `codex/academic-portfolio-redesign`. GitHub Pages currently serves `main:/docs`; no publishing setting or production branch has been changed.

## Sources and priority

1. Four CVs supplied on 25 October 2026. v1 establishes the primary focus on LLM/VLM systems and agentic AI. v2 adds human–AI interaction; v3 adds networked/cyber-physical AI and security/privacy interests; v4 adds edge, embedded, and intelligent sensing systems.
2. Publisher-deposited Crossref DOI records, captured in `review/publication-sources.json`.
3. The existing repository and its genuine application screenshots/report architecture, plus the user's academic and personal narrative in the redesign brief.

The latest CVs supersede outdated website and legacy server content. Extracted CV text and rendered audit pages are local ignored intermediates, not public source files.

## Verified and updated

- Lecturer in CSE, MIST, since April 2024; academic email and current research roles agree across the supplied CVs.
- B.Sc. CSE completed March 2024; CGPA 3.83/4.00; rank 4/88. The previous commit removed CGPA, but the latest CVs and current brief explicitly supply it. Confirm that it should remain publicly displayed.
- Primary research: LLM/VLM systems, multimodal agentic AI, uncertainty/calibration, evaluation and failure analysis. Related interests are described as connected areas and ongoing learning.
- Research collaborator since November 2025; EEG grant co-investigator since March 2026. These are CV-supported roles, not independent claims about completed experiments.
- Four published papers have exact titles, full author order, proceedings/journal details, pages/article numbers and DOIs taken from publisher-deposited metadata.
- Light Canvas's deposited first-author name is **Khaled Hasan Irfan**, not just Khaled Hasan. Preserve it in citations. Proceedings year is 2024; online publication is 6 June 2025. The year-grouped citation uses 2024 and the news item explains the online date.
- Array issue month is July 2026; do not claim this is an online-first announcement date.
- The Top 2% ICCIT award, academic honors, and team rover achievements are supported by the supplied CVs. The award link is retained from the original site; private Drive certificate access was not independently verified.
- The primary-focus CV supplied by the user is now the download at `docs/assets/files/khaled-hasan-cv.pdf`. The old `/cv.pdf` bookmark also points to the substantive CV rather than the placeholder.
- Old project repository URLs using `khaledirfan` were replaced with existing repositories under `khaledhasanirfan`.
- Current code identifiers for courses are retained from the original site and matched by course name against the newer CVs. Terms/semesters remain unspecified.

## Status and citation questions

- **Web3 / Web2, HCI-E 2025:** latest CV says presented, to appear in Springer CCIS, DOI not yet assigned. Keep in Accepted / in press, separate from published citations. Need final exact title, full author list/order, proceedings details and DOI/PDF when available. The older website and latest CV abbreviate the title differently.
- **Nuclear safety manuscript:** latest CV says under review. Existing website gave an incomplete/different author ordering. The page uses a separate manuscript entry, identifies only known collaborators, and does not pretend to provide a full citation. Confirm current status, full ordered authors, final title and any public manuscript URL. No private submitted manuscript is linked.
- Direct publisher pages and Google Scholar could not be fetched by the web text tool during the initial audit (access errors); Crossref deposits are the verification source for the four DOI records. Do not imply a complete Google Scholar audit.
- Open-access PDF files have not been supplied. DOI landing-page links are used rather than guessed PDF URLs. Add PDFs only when the public file is verified and redistributable.
- Omit Q1 and impact-factor labels: the CV reports them but journal category/year/ranking evidence was not independently established.
- Omit the old claim of “six peer-reviewed papers”: it combined published, in-press, and under-review work.

## Editorial material to approve

- Homepage/research prose and the teaching philosophy are editorial drafts grounded in the supplied CVs and brief. Confirm that the wording reflects your practice.
- Current investigations have no fabricated results, accuracy numbers, experiments, participant counts or completed-study claims.
- The 220+ students statement is CV-supported and placed on Teaching only; clarify a reference period if a more precise account is desired.
- Some former full-stack/industry roles on the old website are absent from the latest CVs. These were omitted pending confirmation; source remains in Git history and the legacy implementation.
- LinkedIn is omitted until the current profile is confirmed. A previous URL exists in the old website; its identity/access was not verified.
- The retained seaside portrait is genuine but informal. A professional portrait can replace it later. No beach/location is inferred from the photograph.
- Personal contact phone/address and reference contact lists are not repeated across website pages; the supplied CV remains the source for its own details.

## Images and upcoming material

- Original `light-canvas-real.jpg` and `airborne-architecture.jpg` are retained as genuine evidence; efficient WebP copies are used.
- Existing editorial images (banking, farmer study, semantic jobs, VLM, skin, delivery bot, nuclear safety and Web3) were generated illustrations. They were removed from the initial showcase, not passed off as real research imagery. Original files remain available in Git history/checkout.
- The user subsequently authorized new generated concept illustrations as temporary visuals. Any such image must be visibly labeled **AI-generated concept illustration**, and its record must distinguish illustration from experimental evidence.
- Needed next: actual publication figures/PDFs, research diagrams, rover/bot photographs, system screenshots, current project roles/outcomes, first essays, and travel/life photo stories with dates, locations, captions and alt text.
- Writing and Life & Travels currently have no published posts. There are no invented trips, testimonials, article dates or life events.

## Deployment gate

Build/check/test results and screenshots are recorded in `QA_REPORT.md` and `review/`. Review the draft pull request and content questions before merging into `main`. Merging changes `docs/` on the live publishing branch and triggers GitHub Pages.

## Owner clarifications incorporated during review

- The owner confirmed the nuclear-safety manuscript is **still under review**. It remains separate from peer-reviewed publications.
- The owner confirmed Web3/Web2 is **in press**, and its PLS-SEM tool belongs to the same paper. These now form one project entry. No separate invented PLS-SEM product, language/framework, release, or quantitative result is claimed.
- The owner's requested project selection is now: Light Canvas; AutoML; autonomous delivery bot (precisely described as line-following autonomy); adaptive mobile-banking UI; Web3/Web2 and its PLS-SEM tool; multimodal multi-agent AI; LLM/VLM trust comparison; and trustworthy skin-lesion classification. NLP job matching remains in the publication record; rover involvement remains in About/service and honors.
- Google Scholar was subsequently accessible through the browser. Its profile lists the four published DOI works. It provides publisher-hosted IEEE PDF links and ACM/Elsevier HTML full-text links; those exact links are now included. Programmatic publisher checks were blocked (403/418), and ScienceDirect presented a CAPTCHA, so PDF availability was not independently downloaded/validated. The DOI remains the primary stable paper link. No CAPTCHA was solved.
- Scholar gives the Array author as “Khaled Hasan Irfan” and a date of 19 May 2026; Crossref deposits give “Khaled Hasan” and the July 2026 issue. The citation follows Crossref and the July news item refers to the issue; the author/date discrepancy is retained for the owner's review.
- The owner authorized AI concept imagery as temporary project/ongoing-work visuals. Six new illustrations were generated using the built-in image tool. Their complete prompts and provenance are in `review/image-generation.json`. Every concept image is visibly identified; none is a reported experiment, real system photograph, or medical result.
- The owner requested a dark background, modern sans-serif typography, a neural-network atmosphere, a background-free portrait, fewer introductory labels, and list-based publication/project layouts. These instructions supersede the initial light/serif design in the master brief. The final theme uses Manrope and IBM Plex Sans, a restrained static neural-network backdrop, and editorial lists. No particle engine or continuous animation was introduced.
- Background removal of the supplied portrait was performed with the built-in image editing tool, then transparency-preserving WebP optimization. This is an edited portrait derived from the real photograph; the original remains unchanged. Review the cutout for any identity/detail alterations before production. Prompt/provenance: `review/portrait-edit.json`.
- Personal interests now reflect the owner's statement: travel, exploring, adventures by the water, different cuisines/food, and many sports. No specific destination, trip date, match, or life event has been invented.
