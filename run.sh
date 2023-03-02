#!/bin/bash
# shellcheck disable=SC2046

# Load environment variables
export $(egrep -v '^#' .env | xargs -d '\n')

bls function invoke --serve --rebuild \
  --env STORAGE_ENDPOINT='$STORAGE_ENDPOINT' \
  --env STORAGE_ACCESS_TOKEN='$STORAGE_ACCESS_TOKEN'