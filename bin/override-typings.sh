#!/bin/bash

set -e

curl -O https://gist.githubusercontent.com/slavomirvojacek/a89dfaa2203cf883db3711785b179c34/raw/dc2dac9b587e6ded24bb9e6dffdb063215ee8e54/gistfile1.txt
mv gistfile1.txt node_modules/axios/axios.d.ts