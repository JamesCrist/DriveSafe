#!/bin/bash

mkdir -p <%= docsPath %>

cp -Rn /usr/local/lib/node_modules/meteor-jsdoc/example/meteor/. $DOCS_PATH
