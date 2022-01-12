#!/usr/bin/env bash
set -ex

npx typedoc src/index.ts \
  --out docs \
  --hideBreadcrumbs true \
  --name "cf-migrations API"

rm docs/README.md