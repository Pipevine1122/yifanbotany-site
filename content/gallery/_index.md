---
title: "Gallery"

# Captions map (key = basename without extension)
captions:
  ld_1: "*Hedychium coronarium* reproductive organs © Studio Viola™"
  ld_2: "*Cypripedium macranthos* © Studio Viola™"
  ld_3: "*Aristolochia zhuhaiensis* © Studio Viola™"
  ld_4: "*Aristolochia pendostoma* sp. nov. © Studio Viola™"
  ld_5: "*Aristolochia geantha* © Studio Viola™"
  ld_6: "*Aristolochia pulvinata* © Studio Viola™"
  wc_1: "*Yulania denudata* © Studio Viola™"
  wc_2: "*Nepenthes jamban* © Studio Viola™"
  wc_3: "*Balistoides conspicillum* © Studio Viola™"
  wc_4: "*Rhizanthes deceptor* © Studio Viola™"
  wc_5: "*Rafflesia panchoana* © Studio Viola™"
  wc_6: "*Amorphophallus hayi* © Studio Viola™"
  mini_1: "Cute element #1"

# Define sections. Add more later as you wish.
sections:
  - title: "Scientific Illustrations"
    match: "artwork/ld_*"   # files that go into this section
    cols: 3                 # 2 per row
    max_height: 640         # px (uniform height). Set 0 to auto per-row equal height
    divider_after: true

  - title: "Creative Works"
    match: "artwork/wc_*"
    cols: 3
    max_height: 320
    divider_after: false

  # Example future section: 5 per row mini artworks
  - title: "Icons & Logos"
    match: "artwork/mini_*"
    cols: 5
    max_height: 160         # small, uniform height
    divider_after: false
---
