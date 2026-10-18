#!/usr/bin/env python3
"""Offline checks for the generated website. No third-party Python packages."""
import argparse
import json
import re
import sys
from collections import Counter
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urljoin, urlsplit


class Page(HTMLParser):
    def __init__(self, path):
        super().__init__(convert_charrefs=True)
        self.path = path
        self.ids = []
        self.refs = []
        self.errors = []
        self.h1 = 0
        self.main = 0
        self.description = False
        self.canonical = ""
        self.noindex = False
        self.in_dialog = False
        self.feed(path.read_text())

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag == "dialog":
            self.in_dialog = True
        self.h1 += tag == "h1"
        self.main += tag == "main"
        if "id" in attrs:
            self.ids.append(attrs["id"])
        if tag == "meta" and attrs.get("name") == "description":
            self.description = bool(attrs.get("content"))
        if tag == "meta" and attrs.get("name") == "robots":
            self.noindex = "noindex" in attrs.get("content", "")
        if tag == "link" and attrs.get("rel") == "canonical":
            self.canonical = attrs.get("href", "")
        for attr in ("href", "src", "data-index"):
            if attr in attrs:
                self.refs.append(attrs[attr])
        if tag == "object" and "data" in attrs:
            self.refs.append(attrs["data"])
        if "srcset" in attrs:
            self.refs.extend(part.strip().split()[0] for part in attrs["srcset"].split(","))
        if tag == "img" and not self.in_dialog:
            for attr in ("src", "alt", "width", "height"):
                if not attrs.get(attr):
                    self.errors.append(f"Image missing {attr}")
        if tag == "a" and attrs.get("target") == "_blank" and "noopener" not in attrs.get("rel", ""):
            self.errors.append("New-tab link missing noopener")
        if any(key.startswith("on") for key in attrs):
            self.errors.append("Inline event handler")

    def handle_endtag(self, tag):
        if tag == "dialog":
            self.in_dialog = False


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("directory", nargs="?", default="public")
    parser.add_argument("--base-url", default="https://yifanbotany.com/")
    args = parser.parse_args()
    root = Path(args.directory).resolve()
    base = urlsplit(args.base_url)
    prefix = base.path.rstrip("/") + "/"
    pages = {path.resolve(): Page(path) for path in root.rglob("*.html")}
    errors = []

    def check_ref(ref, source_url):
        if not ref:
            return "Empty link or asset URL"
        target = urlsplit(urljoin(source_url, ref))
        if target.scheme in ("mailto", "tel", "data"):
            return None
        if target.scheme not in ("http", "https"):
            return f"Unsupported URL: {ref}"
        if target.netloc not in (base.netloc, "yifanbotany.com"):
            return None
        path = unquote(target.path)
        if "//" in path:
            return f"Double slash in URL: {ref}"
        if not path.startswith(prefix):
            return f"URL escapes deployment prefix {prefix}: {ref}"
        file = root / path[len(prefix):]
        if file.is_dir():
            file /= "index.html"
        if not file.is_file():
            return f"Missing local target: {ref}"
        if target.fragment and file.suffix == ".html":
            if unquote(target.fragment) not in pages[file.resolve()].ids:
                return f"Missing fragment: {ref}"
        return None

    for path, page in pages.items():
        relative = path.relative_to(root)
        source_url = urljoin(args.base_url, str(relative))
        page_errors = list(page.errors)
        if page.h1 != 1:
            page_errors.append(f"Expected one h1, got {page.h1}")
        if page.main != 1:
            page_errors.append(f"Expected one main landmark, got {page.main}")
        if not page.description:
            page_errors.append("Missing meta description")
        if not page.canonical.startswith(args.base_url):
            page_errors.append(f"Non-absolute or incorrect canonical URL: {page.canonical}")
        for identifier, count in Counter(page.ids).items():
            if count > 1:
                page_errors.append(f"Duplicate id: {identifier}")
        for ref in page.refs:
            error = check_ref(ref, source_url)
            if error:
                page_errors.append(error)
        text = path.read_text()
        for marker in ("github.com/example", "10.1234/example", "xxx.xxx.com", "fig1.jpg", "zhaohuabing@gmail", "algolia", "artalk"):
            if marker in text:
                page_errors.append(f"Legacy placeholder/integration: {marker}")
        errors.extend(f"{relative}: {error}" for error in set(page_errors))

    required = ("index.html", "about/index.html", "research/index.html", "publications/index.html", "cv/index.html", "gallery/index.html", "album/index.html", "news/index.html", "updates/index.html", "meet/index.html", "search/index.html", "404.html", "index.json", "index.xml", "sitemap.xml", "robots.txt", "files/Yifan_CV.pdf")
    errors.extend(f"Required file missing: {name}" for name in required if not (root / name).is_file())
    if (root / "index.json").exists():
        entries = json.loads((root / "index.json").read_text())
        if len(entries) < 8:
            errors.append("Search index is unexpectedly empty/incomplete")
        for entry in entries:
            error = check_ref(entry["url"], args.base_url)
            if error:
                errors.append(f"Search index: {error}")
    # A single hero should never silently revert to a tens-of-megabytes original.
    oversized = [p for p in root.rglob("*") if p.is_file() and p.suffix.lower() in (".png", ".jpg", ".jpeg", ".webp") and p.stat().st_size > 2_000_000]
    errors.extend(f"Oversized published image: {p.relative_to(root)}" for p in oversized)
    if errors:
        print("\n".join(sorted(set(errors))))
        print(f"FAILED: {len(errors)} issues")
        return 1
    size = sum(p.stat().st_size for p in root.rglob("*") if p.is_file())
    print(f"PASS: {len(pages)} HTML pages; local links, anchors, images, metadata, search index, required routes, and image budgets. Output: {size / 1_000_000:.1f} MB.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
