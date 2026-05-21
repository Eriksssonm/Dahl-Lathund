#!/bin/bash
# deploy.sh – bumpa cache-version och pusha
# Användning: bash deploy.sh "commit-meddelande"

set -e

BUILD=$(date +%Y%m%d-%H%M)
MSG=${1:-"Deploy $BUILD"}

# Bumpa cache-version i sw.js med dagens datum+tid
sed -i "s/dahl-lathund-v[^'\"']*/dahl-lathund-v$BUILD/g" sw.js
echo "Cache-version: dahl-lathund-v$BUILD"

git add index.html sw.js manifest.json
git commit -m "$MSG"
git push origin main
echo "✅ Pushad: $MSG"
