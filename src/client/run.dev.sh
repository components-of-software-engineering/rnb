#!/bin/sh

PWD=$(pwd)

cd "$(dirname "$0")" && \

npm ci && \
npm run watch && \

cd $PWD
