#!/usr/bin/env bash
set -euo pipefail
echo "Running setup (bash)"
if [ ! -f package.json ]; then
  echo "package.json not found. Aborting." >&2
  exit 1
fi
echo "Installing npm dependencies..."
npm install
echo "Running tests..."
npm test
