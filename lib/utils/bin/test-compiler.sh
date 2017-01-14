#!/bin/bash

set -e

rm -rf ./dist.test

! ./node_modules/typescript/bin/tsc -p "tsconfig.test.json"
