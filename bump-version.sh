#!/usr/bin/env bash
# Run this before every deploy/commit that changes site files:  ./bump-version.sh
# It stamps a new version on all asset links, the version meta tag and version.json,
# so browsers and CDNs fetch fresh files without a hard reload.
set -euo pipefail
cd "$(dirname "$0")"
V=$(date +%Y%m%d%H%M)
perl -pi -e "s/\?v=[0-9]+/?v=$V/g; s/(name=\"site-version\" content=\")[0-9]+/\${1}$V/" index.html lab.html 404.html content.js
printf '{"v":"%s"}\n' "$V" > version.json
echo "Site version is now $V"
