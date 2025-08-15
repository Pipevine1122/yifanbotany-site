---
title: "Publications"
menu:
  main:
    weight: 30
---

<style>
  .pub-link-row{
    display:flex;
    justify-content:center;
    align-items:center;
    gap:80px; /* 两个链接间距 */
    margin: .5rem 0 1rem 0;
    flex-wrap:wrap;
  }
  .pub-link{
    display:inline-flex;
    align-items:center;
    gap:6px; /* 图标与文字间距 */
    text-decoration:none;
    color:#000; /* 链接文字颜色，可换成主题色 */
    font-weight:700;
  }
  .pub-link:hover{
    text-decoration:underline;
  }
  .pub-link img{
    height:24px; /* 统一高度 */
    width:auto;
    display:block;
  }
  .thin-divider{
    border:none;
    border-top:1px solid #ccc;
    margin:1.2rem 0;
  }
</style>

<div class="pub-link-row">
  <!-- ResearchGate -->
  <a class="pub-link" href="https://www.researchgate.net/profile/Yifan-Wang-188" target="_blank" rel="noopener">
    <img src="/img/icons/researchgate-official.png" alt="ResearchGate">
    <span>ResearchGate</span>
  </a>

  <!-- Google Scholar -->
  <a class="pub-link" href="https://scholar.google.com/citations?user=Jkx1GyYAAAAJ&hl=en" target="_blank" rel="noopener">
    <img src="/img/icons/googlescholar-official.png" alt="Google Scholar">
    <span>Google Scholar</span>
  </a>
</div>

<hr class="thin-divider">


<!-- Publications List -->
<ol>
  <li>
    <strong>Wang, Y.F.</strong>, Liao, S., Guo, Z.R., Li, P., Huang, Y.S., Onyenedum, J.G., 2025. 
    Phylogenomics of <i>Aristolochia</i> subg. <i>Siphisia</i> (Aristolochiaceae) reveals widespread incomplete lineage sorting and supports a novel pollinator-filtering hypothesis. 
    Manuscript under review, <em>Molecular Phylogenetics and Evolution</em>. Preprint available at bioRxiv: 
    <a href="https://doi.org/10.1101/2025.05.29.656634" target="_blank">https://doi.org/10.1101/2025.05.29.656634</a>
  </li>
  <li>
    Guo, Z.R., <strong>Wang, Y.F.</strong>, Onyenedum, J.G., Li, J., 2025. 
    <i>Aristolochia geantha</i> (Aristolochiaceae), a new species from Yunnan, China. 
    <em>Taiwania</em> 70, 293–300. (<strong>Cover Feature</strong>).
    <a href="https://doi.org/10.6165/tai.2025.70.293" target="_blank">https://doi.org/10.6165/tai.2025.70.293</a>
  </li>
  
  <li>
    <strong>Wang, Y.F.</strong>, Guo, Z.R., Landrein, S., Onyenedum, J.G., Liao, S., 2025. 
    <i>Aristolochia zhuhaiensis</i>, a self-supporting new species of Aristolochiaceae from Guangdong, China and notes on <i>Aristolochia thwaitesii</i>. 
    <em>PhytoKeys</em> 254, 61–76. 
    <a href="https://doi.org/10.3897/phytokeys.254.139616" target="_blank">https://doi.org/10.3897/phytokeys.254.139616</a>
  </li>
  <li>
    Zhang, H.L., <strong>Wang, Y.F.</strong>, Guo, Z.R., Zhu, T., Yang, H.H., Yin, Z.J., 2024. 
    <i>Aristolochia pulvinata</i>, a new species of Aristolochiaceae from Yunnan, Southwest China. 
    <em>Phytotaxa</em> 675, 261–272. 
    <a href="https://doi.org/10.11646/phytotaxa.675.3.5" target="_blank">https://doi.org/10.11646/phytotaxa.675.3.5</a>
  </li>
</ol>

<hr class="thin-divider">

<style>
  /* 统一控制封面高度：只改这一行就能整体变高/变低 */
  .cover-gallery { --cover-h: 240px; }

  /* 用 flex 包裹，按内容宽度排布，空间不够就换行；不再用固定列网格 */
  .cover-gallery{
    display: flex;
    flex-wrap: wrap;
    gap: 6px;              /* 图片之间很窄的间距 */
    align-items: flex-start;
    justify-content: flex-start;
    margin-top: .5rem;
    margin-bottom: 1.5rem;
  }

  .cover-gallery figure{
    margin: 0;
    display: flex;
    flex-direction: column;
    align-items: center;   /* caption 居中，可改为 flex-start 左对齐 */
    flex: 0 0 auto;        /* 关键：不要伸缩，宽度由图片自然决定 */
  }

  /* 核心：固定高度 + 等比缩放；不设 max-width，避免被列宽压窄 */
  .cover-gallery img{
    height: var(--cover-h);
    width: auto;
    display: block;
    border: 1px solid #ddd;
  }

  /* 小屏兜底：避免超宽图片溢出屏幕（单列时高度改为自适应没关系） */
  @media (max-width: 600px){
    .cover-gallery img{ max-width: 100%; height: auto; }
  }

  /* 让 caption 紧贴图片且底边整齐 */
  .cover-gallery figcaption{
    margin-top: 2px;       /* 很小的间距 */
    line-height: 1.2;
    font-size: .85em;
    color: #555;
    white-space: nowrap;   /* 避免换行，底边统一 */
    min-height: 1.2em;     /* 固定一行的高度，行底对齐更整齐 */
  }

  /* ==== 禁止下载：覆盖层 + 禁止选中/拖拽/长按 ==== */
  .cover-gallery figure{ position: relative; }
  .cover-gallery figure::after{
    content: "";
    position: absolute;
    inset: 0;
    z-index: 3;            /* 覆盖在图片上层，拦截右键/拖拽 */
    background: transparent;
    pointer-events: auto;
  }

  .cover-gallery img{
    user-select: none;
    -webkit-user-select: none;
    -webkit-user-drag: none;
    -webkit-touch-callout: none;   /* iOS 长按菜单 */
  }
</style>



<div class="cover-gallery">
  <figure>
    <img src="/img/covers/mpe2025.png" alt="MPE 2025">
    <figcaption>Wang et al., 2025</figcaption>
  </figure>

  <figure>
    <img src="/img/covers/taiwania2025.png" alt="Taiwania 2025">
    <figcaption>Guo et al., 2025</figcaption>
  </figure>

  <figure>
    <img src="/img/covers/pk2025.png" alt="PhytoKeys 2025">
    <figcaption>Wang et al., 2025</figcaption>
  </figure>

  <figure>
    <img src="/img/covers/pt2024.png" alt="Phytotaxa 2024">
    <figcaption>Zhang et al., 2024</figcaption>
  </figure>
</div>

<script>
(function(){
  var gallery = document.querySelector('.cover-gallery');
  if(!gallery) return;

  // 禁止拖拽保存
  gallery.querySelectorAll('img').forEach(function(img){
    img.setAttribute('draggable','false');
    img.addEventListener('dragstart', function(e){ e.preventDefault(); });
  });

  // 局部屏蔽右键菜单（仅在封面区域）
  gallery.addEventListener('contextmenu', function(e){
    e.preventDefault();
  }, true);
})();
</script>
