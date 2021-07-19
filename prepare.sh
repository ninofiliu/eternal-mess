#!/bin/sh

if [ $# -ne 2 ]
then
  echo "usage: source prepare.sh WIDTH HEIGHT"
  return
fi

w=$1
h=$2

port=8081
for file in in/src/*
do
  name=$(basename $file)

  if [ -f "./in/${w}x${h}/${name}.shifts.json" ]
  then
    echo "$name: already prepared, skipping..."
    continue
  fi

  echo "$name: preparing..."
  npx snowpack dev --devOptions.port $port --devOptions.openUrl "/?fn=prepare&w=$w&h=$h&name=$name" &

  port=$(( $port + 1 ))
done
