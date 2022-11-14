#!/bin/bash
# shellcheck disable=SC2046

# Load environment variables
export $(egrep -v '^#' ../.env | xargs -d '\n')

bls function invoke report \
  --env STORAGE_ENDPOINT='$STORAGE_ENDPOINT' \
  --env STORAGE_ACCESS_TOKEN='$STORAGE_ACCESS_TOKEN' \
  --env RPC_NODE_ENDPOINT='$RPC_NODE_ENDPOINT' \
  --env REPORT_TASK_ENDPOINT='$REPORT_TASK_ENDPOINT'