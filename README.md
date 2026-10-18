# Yifan Wang’s website

A small Hugo site for research, publications, news, botanical artwork, photography, and meetings. It deploys to the existing GitHub Pages site at https://yifanbotany.com/.

## Work locally

Use **Hugo Extended 0.148.2** (pinned in `.hugo-version`) and Python 3.11+. There are no npm packages, theme submodules, Sass dependencies, or client framework.

```sh
make serve
make check
```

`make serve` previews at http://localhost:1313/. `make check` rebuilds `public/` from scratch, validates configuration, and checks generated links, anchors, image dimensions, metadata, search data, required routes, and image budgets. Generated output is ignored by Git; never edit `public/`.

A push to `main` runs validation and deploys via `.github/workflows/hugo.yaml`. Pull requests run validation only. Check the workflow’s deployment result before treating a push as live.

## Edit the right file

| Information | Source |
| --- | --- |
| Site identity, contact email, navigation | `hugo.toml` |
| Academic/social profiles; current and former affiliations | `data/profile.toml` |
| Biography | `content/about/index.md` |
| Home introduction and botanical poster legend | `content/_index.md` |
| Research cards and detail pages | `content/research/<project>/index.md` |
| Publication list and true cover features | `data/publications.toml` |
| Your news, notes, ideas, and photo posts | `content/news/<slug>/index.md` |
| Gallery: artwork, commissions, and captions | `content/gallery/` |
| Album entry linked from News, with original photographs and captions | `content/news/album/` |
| Public CV | `static/files/Yifan_CV.pdf` |
| Booking links, activation switch, and workspace | `data/booking.toml` |
| Course assignments and office hours | `data/teaching.toml` |
| Unified typography, colors, responsive layout | `assets/css/site.css` |
| Menu, image viewer, local search | `assets/js/site.js` |
| Preferred-time email requests before calendar activation | `assets/js/booking.js` |

### Add a news post

```sh
hugo new content news/my-post/index.md --kind news
```

Write your own title, date, summary, and optional broad category (for example `Notes` or `Ideas`). Add images beside the Markdown file and use `![Descriptive caption](photo.jpg)`. Set `thumbnail: "photo.jpg"` for a feed thumbnail. Drafts are excluded until `draft: false`. Obtain permission before publishing identifiable student achievements or photographs. Post date and the date an event happened are separate; write the event date in the body when relevant.

News presents authored posts as article rows, with the existing Album as one undated archive entry. Gallery remains a separate art and commissions page. No sample news is published; new posts are drafts until you choose to publish them. `/updates/` redirects to `/news/`; the Album retains `/album/`. Photo search opens the Album directly.

### Add a research project

```sh
hugo new content research/my-project/index.md --kind research
```

Add `cover.jpg` beside the Markdown file, write `card_summary`, and choose `research_group = "current"` (Current research) or `research_group = "earlier"` (Earlier work). These describe your involvement, not whether a scientific question is finished. Feature your primary projects; supporting collaborations need not have their own cards. Unclassified existing projects stay visible until you assign them. Set `draft: false` when the card is ready. Set `details_ready: true` and `noindex: false` only after reviewing the full methods/results text. The two existing detail pages retain their URLs, but remain unlinked and excluded from search, sitemap, and RSS pending content review. Only real supplied paper, preprint, code, and poster links are displayed.

### Add a publication

Append an `[[items]]` block in `data/publications.toml`. Years are sorted and grouped automatically. `cover` is optional and must only be set for an actual cover feature. Additional cover features reuse the same size and layout. Ordinary paper first pages are not displayed as cover features.

### Images and fonts

Keep originals in `assets/img/` or alongside the relevant content. Hugo generates WebP sizes, intrinsic dimensions, and larger image-viewer variants; the originals are not automatically published. Use the shared image partials. No photo is stretched or cropped in artwork, album, research, or publication displays. Only the decorative home banner fills its frame.

The font stack is **Optima → Candara → Segoe UI → sans-serif**, shared across headings, body copy, and navigation. Optima uses the visitor’s installed font; the repository does not redistribute a font file. Cross-platform identical Optima rendering would require an appropriately licensed webfont supplied by the owner.

## Backups

Use Git history for earlier website versions. The original editable banner is preserved locally in `design/home-bg-flowers.psd` (ignored by Git); see `design/README.md`. There is one working website directory.

## Before publishing

Run `make check`, inspect a phone and desktop layout, and resolve the owner decisions in `docs/CONTENT-UPDATE-CHECKLIST.md`. Booking activation has a separate guide: `docs/BOOKING-SETUP.md`. Do not commit calendar credentials, API keys, booking attendee data, or provider secrets. Public booking URLs are sufficient for the website.

The previous CleanWhite theme is no longer a runtime dependency. Its license and attribution are retained in `docs/legacy-theme-LICENSE.txt`; previous source remains in Git history.
