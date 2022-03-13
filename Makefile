build: configurator/configurator.js

configurator/configurator.js: lib
	npx rollup src/configurator.js --file $@ --format iife

run: lib
	npx http-server configurator

lib: scripts/pull-openscad.sh
	rm -rf lib
	mkdir -p lib
	cd lib && $(CURDIR)/$?
