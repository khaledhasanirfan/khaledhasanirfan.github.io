# Portfolio design references

## Owner direction — 26 October 2026

Khaled asked to study **https://xbow.com/** and **https://xbow.com/labs** and retain their UI/UX, animation, navigation, and visual style as inspiration for future portfolio updates. This is a reference brief, not approval of a particular redesign. The live portfolio was not changed as part of this review.

Read this brief before future visual updates. Adapt the references to an academic portfolio; preserve Khaled's identity, content, and established preferences.

## Observed on XBOW's homepage

Reviewed the desktop hero, desktop Platform dropdown, scrolling sections, and mobile hero/menu.

- Near-black blue-green surfaces, atmospheric green lighting, thin borders, restrained edge glow, and generous space.
- A contained floating header stays available on scroll. Desktop dropdowns group links with short descriptions; Escape closes the tested dropdown. Mobile navigation expands inside the floating shell with accordion categories.
- Large technical monospaced headline paired with a quieter sans-serif introduction. Sampled desktop styles: Avenue Mono headline at 60px; Geist paragraph at 20px. These are observations at one viewport, not a complete font specification.
- The hero balances text with layered product imagery that fades into the background. Depth comes from overlap, lighting, and masking.
- Motion observed: headline words progress from blurred/incomplete to sharp; statistics briefly display scrambled characters before resolving. Sections reveal progressively during scrolling.
- Long-page composition alternates explanation, evidence, diagrams, and a tabbed trace section. The navigation and headings give that length a readable structure.

Source: [XBOW homepage](https://xbow.com/).

## Observed on XBOW Labs

Reviewed the desktop hero, interactive mission illustration, research feed, and mobile hero/menu.

- Dark navy/black, off-white, and acid lime form a strong editorial identity. Sampled body background: `#000c12`; text: `#fcfcfc`; button fill: `#ccff00`.
- Dotted textures, oversized pixel lettering, stepped corners, and grainy isometric illustrations repeat a consistent visual vocabulary.
- Sampled fonts: Space Grotesk for headings, Space Mono for navigation/body, Departure Mono for buttons. Compact metadata contrasts with large article titles.
- A featured article uses an asymmetric image/title composition. The research feed uses image-led columns with category, author, title, and summary.
- On scroll, the header condenses to a small mark. Selecting the second mission item visibly highlights its matching illustration layer and dims the others.
- Motion includes staged text/image reveals and changing graphic emphasis. Pixel lettering appears progressively. Exact durations, easing, hover behavior, and motion-library implementation were not measured.
- At 390px, content stacks vertically; the menu becomes a full-screen list with separators and an explicit Close control.

Source: [XBOW Labs](https://xbow.com/labs).

## Additional owner reference — 28 October 2026

Khaled also requested [Command Code](https://commandcode.ai/) as a UI preference reference. Reviewed its desktop hero, feature rows, demonstration sections, and 390px mobile hero/menu. This extends the inspiration brief; no live portfolio changes were requested in this review.

### Observed on Command Code

- Pure black surfaces, off-white headings, muted gray supporting copy, and selective blue-violet accents. Thin grid rules and outlined square intersections connect sections into one composition.
- Bold sans-serif hero typography with tight line spacing, colored keyword emphasis, and a quieter secondary line. Sampled desktop hero: Geist, 52px with 54.6px line height. Body background: `#000000`; main text: `#fafafa`.
- Grainy purple rectangular graphics sit inside the hero grid. Pill-shaped actions contrast with the rectangular page structure.
- A persistent black header uses simple horizontal links and one prominent action. Mobile navigation becomes a full-screen vertical list with separators, a Close control, and a wide bottom action. The mobile hero centers and stacks its content.
- Desktop feature rows sit beside a shared terminal preview; the active row has a subtle surface highlight. A sampled row defines 200ms color/background transitions. Mobile exposes feature buttons with descriptions.
- Terminal demonstrations progressively populate with commands and results. Replay controls accompany animation sections. A horizontal demo-video strip exposes previous/next controls.
- Exact animation timing beyond the sampled row transition, hover behavior, and the complete motion implementation were not verified.

### Portfolio adaptations to consider

- Combine Command Code's sparse grid, typography, and purple emphasis with XBOW's restrained lighting and depth. Preserve Khaled's green primary actions and accessible contrast.
- Use fine rules to organize publication/project lists; consider a selected project row paired with one shared image or methods preview. Keep citations and essential details immediately readable.
- Borrow the typographic confidence and deliberate negative space without copying sales language, terminal-install controls, decorative numbering, or repeated `//` labels.
- Use an original neural-network or agent-workflow illustration where it explains the research. Add replay to a meaningful animated explanation, with a complete static reduced-motion state.
- Keep the default academic content denser and easier to scan than a long product landing page. These are future implementation options, not approved changes or new portfolio facts.

## How to use this in Khaled's portfolio

These are proposed adaptations for the next requested design pass, not features already implemented:

| Area | Direction |
| --- | --- |
| Overall character | Dark, precise, technical, and editorial. Use spacing, alignment, and typography to establish hierarchy. |
| Palette | Preserve green primary actions with dark labels, white/off-white text, and contrasting purple emphasis. Use subtle green/purple illumination locally. |
| Typography | Pair a distinctive modern sans-serif reading face with limited technical mono accents. Compare candidate fonts in real biography and citation content before changing the current self-hosted fonts. |
| Navigation | Explore a compact floating header, clear active-page treatment, and a straightforward mobile list. Keep the portfolio's information architecture simpler than a company megamenu. |
| Hero | Explore a restrained staged name reveal and integrated transparent portrait with lighting/depth. Let the neural-network background support the text. |
| Publications | Keep visible citation lists, clear status/year grouping, and direct paper/DOI links. Use fine rules and spacing for rhythm. |
| Projects | Keep list rows with concise summaries and optional disclosure details. A selected row could update one shared research illustration or preview. |
| Writing | Borrow Labs' title/metadata hierarchy and distinctive feature treatment; adapt the archive to a readable list. |
| Life & Travels | Use the same navigation and typography with more generous photographic storytelling, real captions, and quieter motion. |
| Motion | Favor brief entry reveals, subtle row/link feedback, and purposeful illustration changes. Start with approximately 160–240ms for controls and 400–650ms for entry reveals, then tune in the browser. These timings are proposals. |

## Existing owner preferences to preserve

- Projects and publications use lists; avoid a generic repeated card grid.
- Avoid stock AI-portfolio labels, decorative section numbering, canned slogans, and unnecessary role tags above the name.
- Maintain academic readability, visible focus states, sufficient contrast, and a useful mobile experience. Keep essential content available without animation or JavaScript. Respect reduced-motion preferences; never scramble citations or hide information behind a prolonged reveal.
- Use original visuals or clearly identified concept art. Preserve the authentic portrait; do not reuse XBOW branding, illustrations, screenshots, or proprietary fonts as portfolio assets.
- Keep Writing and Life & Travels as separate pages. The CV download belongs on Home; a separate CV content page is unnecessary.
- Preserve the primary focus on reliable AI systems, LLMs, and agentic AI; Spring / Fall 2027 Ph.D. availability; federated learning and optimization interests. Reinforcement learning and autonomous systems can appear where accurate. Do not restore robotics to the current bio or research interests.
- Separate published, in-press, and under-review work. Do not invent research outcomes, posts, trips, metrics, or credentials.

## Future implementation checks

Review real desktop and narrow-screen content, keyboard navigation, reduced motion, contrast, and loading behavior. Preserve the static GitHub Pages architecture unless a requested feature requires a justified change. Run the existing build/check workflow for implementation changes; this reference document itself does not require rebuilding or deploying the site.
