#!/usr/bin/env bash

rm -rf ./node_modules

for dir in ./apps/*/; do
  if [ -d "$dir" ]; then
    find "$dir" \( -name "dist" -o -name "node_modules" \) -type d -prune -exec rm -rf '{}' +
  fi
done

for dir in ./packages/*/; do
  if [ -d "$dir" ]; then
    find "$dir" \( -name "dist" -o -name "node_modules" \) -type d -prune -exec rm -rf '{}' +
  fi
done

pnpm install

for dir in ./packages/*/; do
  if [ -d "$dir" ]; then
   cd $dir
      pnpm build
    cd ../..
  fi
done
