#! /usr/bin/env python

import os

os.system("which node > node_address_temp")
f = open("node_address_temp","r")
node = f.readline().rstrip('\n')
f.close()
os.system("which jsdoc > jsdoc_address_temp")
f = open("jsdoc_address_temp","r")
jsdoc = f.readline().rstrip('\n')
f.close()

os.system("cd ./source \n export DOCS_PATH=../docs \n git grep -al \"@summary\" | xargs -L 10000 -t  "+ node + " " + jsdoc + " -t ./meteor-jsdoc/template  -c ./meteor-jsdoc/jsdoc-conf.json"  )

