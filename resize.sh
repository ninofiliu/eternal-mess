#!/bin/sh

if [ $# -ne 2 ]
then
  echo "usage: source resize.sh WIDTH HEIGHT"
  return
fi

w=$1
h=$2
dir=in/${w}x${h}
mkdir -p $dir

for file in in/src-800/*
do

  base=$(basename $file)
  out=$dir/$base
  if [ -f $out ]
  then
    echo "$base: already resized, skipping..."
    continue
  fi

  vw=$(ffprobe -v error -select_streams v:0 -show_entries stream=width -of csv=s=x:p=0 $file)
  vh=$(ffprobe -v error -select_streams v:0 -show_entries stream=height -of csv=s=x:p=0 $file)
  if [ $(($vw * $h)) -gt $(($vh * $w)) ]
  then
    sw=$(($vh * $w / $h))
    sh=$vh
    sx=$((($vw - $sw) / 2))
    sy=0
  else
    sw=$vw
    sh=$(($vw * $h / $w))
    sx=0
    sy=$((($vh - $sh) / 2))
  fi

  echo "$base: cropping..."
  ffmpeg -i $file -filter:v "crop=$sw:$sh:$sx:$sy" $base
  echo "$base: resizing..."
  ffmpeg -i $base -vf scale=$w:$h $out
  rm $base

done

echo "done"
