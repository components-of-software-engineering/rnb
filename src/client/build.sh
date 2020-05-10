#!/bin/sh

PWD=$(pwd)

cd "$(dirname "$0")" && \

npm install && \
npm run build:prod && \
npm prune --production && \

cd $PWD
