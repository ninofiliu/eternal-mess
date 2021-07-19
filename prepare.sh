#!/bin/sh

if [ $# -ne 3 ]
then
  echo "usage: source prepare.sh WIDTH HEIGHT MAX_PARA"
  return
fi

w=$1
h=$2
max_para=$3

port=8081
para=0
for file in in/src/*
do
  name=$(basename $file)

  if [ -f "./in/${w}x${h}/${name}.shifts.json" ]
  then
    echo "$name: already prepared, skipping..."
    continue
  fi

  echo "$name: preparing..."
  cmd="npx snowpack dev --devOptions.port $port --devOptions.openUrl /?fn=prepare&w=$w&h=$h&name=$name"
  $cmd &
  para=$(( $para + 1 ))
  if [ $para -eq $max_para ]
  then
    echo "max nb of parallel preparations - exiting"
    return
  fi

  port=$(( $port + 1 ))
done
