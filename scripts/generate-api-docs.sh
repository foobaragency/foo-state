#!/usr/bin/env bash
set -ex

npx typedoc src/index.ts \
  --out docs \
  --hideBreadcrumbs true \
  --name "react-global-state"

rm docs/README.md