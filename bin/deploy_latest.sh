#!/usr/bin/env bash

set -e

log() {
    date +"%H:%M:%S $(printf "[\e[95mINFO\e[39m] %s" "$@" | sed 's/%/%%/g')"
}

cd pulumi/

log "Retrieving S3 Bucket Name"
S3_BUCKET=$(pulumi stack output --json | jq -r ".tictactoeBucket.bucket")

cd ../tic_tac_toe/

log "Deleting old build files"
rm -rf build/

log "Generating new webapp files"
npm run build

log "Uploading files to a S3 bucket: ${S3_BUCKET}"
aws s3 sync ./build/ "s3://${S3_BUCKET}/"
