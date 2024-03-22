dev:
	tsc -w & live-server

build:
	tsc
	mkdir -p docs
	cp -r dist docs
	cp style.css docs
	cp index.html docs