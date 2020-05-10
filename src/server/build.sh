#!/bin/sh

PWD=$(pwd)

cd "$(dirname "$0")" && \

pip install pipenv && \
pipenv install --system --deploy --dev --ignore-pipfile && \
pipenv run flake8 . --count --select=E9,F63,F7,F82 --show-source --statistics && \
pipenv run flake8 . --count --exit-zero --max-complexity=10 --max-line-length=127 --statistics && \
pipenv uninstall --all-dev && \

cd $PWD
