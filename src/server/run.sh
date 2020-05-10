#!/bin/sh

cd "$(dirname "$0")" && \

pipenv sync && \
pipenv run python index.py $1
