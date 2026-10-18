# Website audit and refactor — 2026-10-18

## Problems found and addressed

| Area | Original issue | Change |
| --- | --- | --- |
| Architecture | Custom work spread between copied theme internals and page overrides; duplicated inline styles/scripts | Self-contained Hugo layouts, shared partials, one CSS file and one small JS file |
| Dependencies | Bootstrap/jQuery/icon fonts and unused blog integrations loaded for a small academic portfolio | Removed unused vendor runtime and theme dependency; native HTML/CSS/JS |
| Navigation | Extra trailing slash produced paths such as `/research//`; mobile toggle lacked state | Canonical page links, current-page indication, accessible mobile toggle and Escape behavior |
| Search | Algolia enabled with empty credentials; empty placeholder content | Local generated JSON search, results/error/empty states, accessible labels, shareable query URL |
| Content leakage | Unrelated original-theme author biography, demo bookmarks and donation assets | Removed the known theme/demo material, retained license attribution |
| Research | Fake DOI/GitHub links, missing `fig1.jpg`, disabled-looking buttons, empty output sections | Removed development placeholders; genuine supplied links only; unapproved detail pages kept out of search/sitemap/feed |
| Images | Full-size originals served; missing dimensions; JS-dependent hidden covers; page-wide copy/touch shields | Responsive WebP variants, width/height, native lazy loading, source originals preserved; accessible image dialog and normal touch/selection |
| Layout | Script-based row/caption equalization; varying fixed-size cover thumbnails | CSS grids; artwork/photo aspect ratios retained; one real cover feature and structured publication list |
| Metadata | Empty description, relative canonicals, wrong thumbnail paths, unlabeled social icons | Descriptions, absolute canonical/share-image URLs, correct bundle thumbnails, readable links |
| Deployment | Obsolete shell push to master and npm Algolia commands; unnecessary Sass/submodule setup | One pinned Hugo workflow, PR validation, checksum verification, image caching, scoped deployment permissions |
| Build hygiene | Duplicate ignore rules and ~769 MiB accumulated local build directory | Clean builds and generated-output checks; local `public/` rebuilt to ~24 MiB |
| Identity | Previous employer presented as current; alias displayed throughout | UC Davis / Potter Lab / GGHA, former NYU lab, and Yifan Wang naming, based on owner instructions |
| News | Artwork-only page, content embedded in templates | Article rows with owner-authored posts and one undated Album entry; Gallery remains a separate artwork and commissions page |
| Booking | No scheduling entry point | One calendar on home and Meet, preferred-time email request fallback, and a manual-confirmation inline calendar integration; live provider connection remains pending |

## Size measurements

Measured from fresh local builds, not the old accumulated output:

- Original clean generated output: **101,324,832 bytes** (101.3 MB).
- Refactored generated output: approximately **24.3 MB**, including all image variants and CV.
- Three original homepage images: **46,566,149 bytes**.
- Three default homepage `<img src>` variants: **968,602 bytes**; the browser can select smaller responsive variants.

These are file-size comparisons, not measured download timings or Lighthouse scores. Original photo/art source files remain available for later editing. Unused ordinary publication screenshots are retained in `assets/img/covers/`, without being displayed as cover features.

## Verification

- Hugo Extended 0.148.2 production/minified build with warnings treated as errors.
- 26 generated HTML pages checked for local targets, anchors, metadata, image dimensions/alt text, duplicate IDs, legacy placeholders, and oversized published images.
- Root-domain and `/portfolio/` subdirectory builds checked.
- JavaScript syntax and Git whitespace checks.
- Booking configuration rejects enabled-without-URL, non-HTTPS/unknown-provider URLs, and accidental automatic confirmation.
- Browser checks at 320 px and 390 px, including expanded meeting forms and mobile navigation: no horizontal overflow or broken visible images.
- Mobile menu, image dialog, Escape close, focus return, and botanical search tested.
- Calendar date selection, In person / Zoom email content, past-date/time rejection, required topic, email encoding, year rollover, and leap February verified with a local fixture; no email sent.
- CV name changed without altering the remaining extracted text; both pages rendered and inspected.

## Publishing and recovery

Pushes to `main` run the build and validation workflow before deploying to the existing GitHub Pages domain. Confirm both jobs succeed and verify the live domain after each release. The pre-refactor version remains in Git at `c7ee74c48f32e8ea8182e9faa38495464bd177b5`.

The redundant sibling backup contained only the editable Photoshop banner. It was moved into the repository’s local `design/` directory with matching SHA-256, then the empty backup directory was removed. PSD files remain outside Git and the published output.

## Remaining limits

- External social/profile/DOI links are preserved; a comprehensive remote HTTP health check was not performed. Potter Lab and GGHA official destinations were verified.
- Optima uses the installed system font. Other platforms use the documented fallback stack; no licensed webfont is redistributed.
- Real booking availability, emails, multi-account conflict resolution, and approval/calendar writes require provider account authorization and a live acceptance test. The visible calendar currently collects a preferred date, time, and topic for an email request; it does not show real availability or send requests itself.
- Research claims, new projects, TA courses, and publication status updates remain owner decisions; see `CONTENT-UPDATE-CHECKLIST.md`.

## Architecture references

Hugo’s documented [image processing](https://gohugo.io/content-management/image-processing/) and [page bundles](https://gohugo.io/content-management/page-bundles/) informed the image pipeline. Calendar integration references and its acceptance procedure are in `BOOKING-SETUP.md`.

## Follow-up design corrections

Removed assistant-authored UC Davis news; all new personal posts remain owner-authored. Restored Gallery in navigation and grouped existing Album photographs under News. Simplified homepage lab links, removed redundant former-lab labels and decorative link arrows, and replaced narrowly categorized meeting choices with one calendar. Research status micro-labels were removed; interface language stays broad.

## News and meeting refinements

News now uses article rows rather than a photo wall. The existing Album is one undated archive entry; its original URL and all images are preserved, and `/updates/` redirects to `/news/`. Added the official Department of Plant Sciences link and owner-provided workspace, moved Meet before About, and added an In person / Zoom choice to email requests. Search prompts are intentionally broad. No personal news or Zoom URL was invented.
