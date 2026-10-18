.PHONY: serve build check

serve:
	hugo server --bind 127.0.0.1 --disableFastRender

build:
	python3 scripts/check_config.py
	hugo --gc --minify --cleanDestinationDir --panicOnWarning

check: build
	python3 scripts/check_site.py public
