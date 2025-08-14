---
title: "Gallery"

# Captions map (key = basename without extension)
captions:
  ld_1: "Line drawing #1 © Viola Studio"
  ld_2: "*Cypripedium tibeticum* © Viola Studio"
  ld_3: "*Aristolochia zhuhaiensis* © Viola Studio"
  ld_4: "*Aristolochia pendostoma* sp. nov. © Viola Studio"
  ld_5: "*Aristolochia geantha* © Viola Studio"
  ld_6: "*Aristolochia pulvinata* © Viola Studio"
  wc_1: "*Yulania denudata* © Viola Studio"
  wc_2: "*Nepenthes jamban* © Viola Studio"
  wc_3: "*Balistoides conspicillum* © Viola Studio"
  wc_4: "*Rhizanthes deceptor* © Viola Studio"
  wc_5: "*Rafflesia panchoana* © Viola Studio"
  wc_6: "*Amorphophallus hayi* © Viola Studio"
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
