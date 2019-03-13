#!/usr/bin/env bash
#
#
set -e

dirname=$PWD
dir="${dirname%"${dirname##*[!/]}"}" # extglob-free multi-trailing-/ trim
dir="${dir##*/}"
echo $dir
read -rep $'question name (${dir}):' PROJECT

#bit u && sh -c "$(curl -fsSL https://raw.githubusercontent.com/TheWhiteWolf1337/template/master/install.sh)"