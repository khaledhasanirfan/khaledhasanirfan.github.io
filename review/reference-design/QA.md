# Reference-inspired design pass — 28 October 2026

Implemented in `docs/assets/modern.css`, shared templates, and optional motion enhancements. References and owner preferences are retained in `DESIGN_REFERENCES.md`.

## Changes

- Near-black surfaces, brighter white prose, lime actions, purple emphasis, and fine structural rules.
- Self-hosted Space Grotesk headings with its SIL Open Font License; existing IBM Plex Sans remains the reading face.
- Floating navigation, responsive menu, a transparent portrait with restrained graphic depth, and motion that respects reduced-motion preferences.
- Justified longer prose with natural last lines; headings, controls, and citation metadata remain scannable. Introductory display text avoids automatic word splitting.
- List-based projects/publications, contextual emphasis on documented research and Ph.D. availability, and a compact horizontally scrollable mobile project index.

## Validation

- Build, static checks, publishing integration test, and JavaScript syntax check pass.
- Static checker now validates the active design tokens for AA text/action contrast.
- Chrome layout audit: all 10 main pages at 320, 390, 768, 820, 1024, and 1440 CSS px (60 combinations), with no document overflow. Raw measurements: `responsive-checks.json`.
- A tablet overflow caused by rotated decorative geometry was corrected and the complete matrix rerun.
- Mobile navigation opens/closes; Escape returns focus to its summary. Desktop More menu opens and closes with Escape.
- Project details expand within the mobile viewport. Image viewer opens within the viewport and closes.
- Publication journal filter, no-match state, and title search produce the expected results.
- No browser console errors observed during the interaction review.
- Desktop and mobile screenshots accompany this report. The audit covers these representative Chrome viewports, not physical-device or every-browser certification. Reduced-motion handling was inspected in source; an OS-level preference was not changed during review.
