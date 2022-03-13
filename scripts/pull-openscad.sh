#!/bin/bash
FILES=$(curl -s https://api.github.com/repos/DSchroer/openscad-wasm/releases/latest | jq ".assets[].browser_download_url" -r)
for FILE in $FILES
do
    wget $FILE
done
