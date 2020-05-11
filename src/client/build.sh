#!/bin/sh

PWD=$(pwd)

cd "$(dirname "$0")" && \

npm ci && \
npm run `([ "$#" -eq 1 ] && [ $1 = "--prod" ] && echo "build:prod") || echo "build"` && \
npm prune --production && \

cd $PWD
