#!/usr/bin/env python3
"""Catch incomplete content and unsafe public booking configuration before build."""
import sys
import tomllib
from pathlib import Path
from urllib.parse import urlsplit

ROOT = Path(__file__).resolve().parents[1]


def validate_booking(booking):
    errors = []
    if booking.get("confirmation") != "manual":
        errors.append("Booking must retain manual confirmation, as requested by the owner.")
    if booking.get("enabled") and not booking.get("url"):
        errors.append("Enabled booking requires the owner's real public booking URL.")
    if booking.get("enabled") and not booking.get("embed_url"):
        errors.append("Enabled booking requires an inline calendar embed URL.")
    urls = [booking.get("url"), booking.get("embed_url")]
    for url in filter(None, urls):
        parsed = urlsplit(url)
        if parsed.scheme != "https" or parsed.hostname not in ("cal.com", "app.cal.com") or parsed.username or parsed.password:
            errors.append("Booking URLs must use HTTPS on cal.com or app.cal.com, without credentials.")
    from zoneinfo import ZoneInfo, ZoneInfoNotFoundError
    try:
        ZoneInfo(booking.get("timezone", ""))
    except (ZoneInfoNotFoundError, ValueError):
        errors.append("Booking needs a valid IANA time zone.")
    return errors


def main():
    data = {}
    for path in (ROOT / "data").glob("*.toml"):
        data[path.stem] = tomllib.loads(path.read_text())
    errors = validate_booking(data["booking"])
    for index, item in enumerate(data["publications"]["items"], 1):
        for key in ("title", "authors", "year", "doi"):
            if not item.get(key):
                errors.append(f"Publication {index}: missing {key}")
        if not isinstance(item.get("year"), int):
            errors.append(f"Publication {index}: year must be an integer")
        if not item.get("doi", "").startswith("https://doi.org/"):
            errors.append(f"Publication {index}: use a full HTTPS DOI URL")
        if item.get("cover") and not (ROOT / "assets" / item["cover"]).is_file():
            errors.append(f"Publication {index}: cover does not exist")
    if errors:
        print("\n".join(errors))
        return 1
    print("PASS: content data and booking configuration")
    return 0


if __name__ == "__main__":
    sys.exit(main())
