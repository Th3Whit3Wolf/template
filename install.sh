#!/usr/bin/env bash
#
#
set -e

dirname=$PWD
cdir="${dirname%"${dirname##*[!/]}"}" # extglob-free multi-trailing-/ trim
cdir="${cdir##*/}"
echo $cdir
prompt="question name ("
prompt+=$result
prompt+="):"
echo $prompt
read -rep $prompt PROJECT
echo PROJECT
#bit u && sh -c "$(curl -fsSL https://raw.githubusercontent.com/TheWhiteWolf1337/template/master/install.sh)"
# yarn at end to initialize