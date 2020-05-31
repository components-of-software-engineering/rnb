#!/bin/bash

PWD=$(pwd)

cd "$(dirname "$0")"

cp -r src/client/assets/ src/server

/bin/bash src/client/run.dev.sh & pid=$!
echo "Frontend started. Sleep for 60 sec to bootstrap front";
PID_LIST+=" $pid";

sleep 30

cd src/server/
/bin/bash run.sh --hot-reload & pid=$!
echo "Backend started";
PID_LIST+=" $pid";


trap "kill $PID_LIST" SIGINT
echo "Parallel processes have started";
wait $PID_LIST
kill -9 $(lsof -i:5000 -t)
echo
echo "All processes have completed";

cd $PWD
