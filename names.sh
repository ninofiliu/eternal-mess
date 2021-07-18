#!/bin/sh

cd in/src
names=$(echo *)
cd - > /dev/null

echo $names | sed 's/^/["/' | sed 's/ /","/' | sed 's/$/"]/' > src/names.json

i=0
for name in $names
do
  echo "import v$i from './$name."
  i=$(($i + 1))
done
