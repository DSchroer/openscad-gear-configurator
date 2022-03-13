build: configurator/lib

run: configurator/lib
	npx http-server configurator

configurator/lib: scripts/pull-openscad.sh
	rm -rf configurator/lib
	mkdir -p configurator/lib
	cd configurator/lib && $(CURDIR)/$?
