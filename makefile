dev:
	tsc -w & live-server

build:
	tsc
	mkdir -p site
	cp -r dist site
	cp style.css site
	cp index.html site