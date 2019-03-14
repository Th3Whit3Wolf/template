#!/usr/bin/env bash
#
#
set -e

dirname=$PWD
cdir="${dirname%"${dirname##*[!/]}"}" # extglob-free multi-trailing-/ trim
cdir="${cdir##*/}"

prompt="question name ("
prompt+=$cdir
prompt+="): "
echo $prompt
read -rep \r pname
# make an array of files in directory
# yarn init
# make another array of files in directory
# if directory[@] exist in directory2, rm from directory2
# if drectory2.len() == 1; cd directory2[0]
#echo PROJECT
#bit u && sh -c "$(curl -fsSL https://raw.githubusercontent.com/TheWhiteWolf1337/template/master/install.sh)"
# yarn at end to initialize