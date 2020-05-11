#!/bin/sh

. "$(dirname "$0")"/.env
docker build --tag rnb-site.dev -f dev.dockerfile "$(dirname "$0")"
docker run --network=host -it -p $PORT rnb-site.dev
