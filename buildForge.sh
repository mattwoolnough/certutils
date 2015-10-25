#!/bin/bash

my_cwd=$(pwd)
cd $my_cwd/client/source/vendor/forge/

npm install && npm run minify
echo '// jscs:disable' > $my_cwd/client/source/app/scripts/forge.min.js
echo '/* jshint ignore:start */' >>  $my_cwd/client/source/app/scripts/forge.min.js
cat $my_cwd/client/source/vendor/forge/js/forge.min.js >> $my_cwd/client/source/app/scripts/forge.min.js

cd $my_cwd
