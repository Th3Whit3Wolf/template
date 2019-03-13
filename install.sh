#!/usr/bin/env bash
#
#
set -e

dirname=$PWD
result="${dirname%"${dirname##*[!/]}"}" # extglob-free multi-trailing-/ trim
result="${result##*/}"
echo $result
read -re $'question name (' -i $result -p '):' PROJECT
echo PROJECT
#bit u && sh -c "$(curl -fsSL https://raw.githubusercontent.com/TheWhiteWolf1337/template/master/install.sh)"
# yarn at end to initialize