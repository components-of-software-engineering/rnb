#!/bin/sh

PWD=$(pwd)

cd "$(dirname "$0")" && \

npm run watch && \

cd $PWD
