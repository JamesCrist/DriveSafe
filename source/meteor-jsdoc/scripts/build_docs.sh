#!/bin/bash

mkdir -p $DOCS_PATH/client/data

cd <%= projectPath %>
# Call git grep to find all js files with the appropriate comment tags,
# and only then pass it to JSDoc which will parse the JS files.
# This is a whole lot faster than calling JSDoc recursively.
git grep -al "@summary" | xargs -L 10000 -t \
    "/usr/local/bin/node" \
    "/usr/local/bin/jsdoc" \
    -t /usr/local/lib/node_modules/meteor-jsdoc/template \
    -c /usr/local/lib/node_modules/meteor-jsdoc/jsdoc-conf.json \
    -d $DOCS_PATH


# git grep -al "@summary" | xargs -L 10000 -t  "/usr/local/bin/node" "/usr/local/bin/jsdoc"  -t ./meteor-jsdoc/template  -c ./meteor-jsdoc/jsdoc-conf.json  


