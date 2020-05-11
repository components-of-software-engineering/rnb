#!/bin/sh

if [ "$#" -eq 1 ] && [ $1 = "--hot-reload" ]; then 
    cd "$(dirname "$0")" && \
    
    pipenv sync && \
    FLASK_APP="src/server/index.py" pipenv run python -m flask run 
else
    cd "$(dirname "$0")" && \

    pipenv sync && \
    pipenv run python index.py $1
fi
