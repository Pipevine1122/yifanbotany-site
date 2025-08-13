---
title: "Gallery"

# Captions map (key = basename without extension)
captions:
  ld_1: "Line drawing #1 © Binyu Zhao"
  ld_2: "Line drawing #2 © Binyu Zhao"
  ld_3: "Line drawing #3 © Yushan Cai"
  wc_1: "Watercolor #1 © Binyu Zhao"
  wc_2: "Watercolor #2 © Binyu Zhao"
  mini_1: "Cute element #1"

# Define sections. Add more later as you wish.
sections:
  - title: "Line drawings"
    match: "artwork/ld_*"   # files that go into this section
    cols: 3                 # 2 per row
    max_height: 640         # px (uniform height). Set 0 to auto per-row equal height
    divider_after: true

  - title: "Watercolor"
    match: "artwork/wc_*"
    cols: 3
    max_height: 320
    divider_after: false

  # Example future section: 5 per row mini artworks
  - title: "Mini elements"
    match: "artwork/mini_*"
    cols: 5
    max_height: 160         # small, uniform height
    divider_after: false
---
