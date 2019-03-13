#!/usr/bin/env bash
#
#
set -e

dirname="/path/to/somewhere//"
result="${dirname%"${dirname##*[!/]}"}" # extglob-free multi-trailing-/ trim
result="${result##*/}"
echo $result
read -rep $'question name (testdir):' REPO
