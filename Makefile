build: configurator/configurator.js configurator/configurator.worker.js configurator/openscad.wasm configurator/openscad.wasm.js

configurator/openscad.wasm: lib
	cp lib/openscad.wasm $@

configurator/openscad.wasm.js: lib
	cp lib/openscad.wasm.js $@

configurator/configurator.worker.js: src/* lib node_modules
	npx rollup src/configurator.worker.js --file $@ --format iife

configurator/configurator.js: src/* lib node_modules
	npx rollup src/configurator.js --file $@ --format iife

run: lib node_modules
	npx http-server configurator

node_modules:
	npm ci

lib: scripts/pull-openscad.sh
	rm -rf lib
	mkdir -p lib
	cd lib && $(CURDIR)/$?
