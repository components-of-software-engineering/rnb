#!/bin/sh

. "$(dirname "$0")"/.env
docker build --tag rnb-site.prod -f Dockerfile "$(dirname "$0")"
docker run --env-file "$(dirname "$0")/.env" -it -p $PORT:$PORT rnb-site.prod
