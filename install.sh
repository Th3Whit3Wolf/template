#!/usr/bin/env bash

set -e

Projects[0]='eslint'
Projects[1]='eslint-config-prettier'
Projects[2]='imagemin-giflossy'
Projects[3]='imagemin-mozjpeg'
Projects[4]='imagemin-pngquant'
Projects[5]='imagemin-webp'
Projects[6]='imagemin-zopfli'
Projects[7]='prettier-stylelint'
Projects[8]='stylelint-config-idiomatic-order'
Projects[9]='tslint'
Projects[10]='tslint-config-prettier'
Projects[11]='tslint-microsoft-contrib'
Projects[12]='typescript'

Gulp[0]='gulp-cssnano'
Gulp[1]='gulp-cache'
Gulp[2]='gulp-imagemin'
Gulp[3]='gulp-imagemin-pngquant'
Gulp[4]='gulp-imagemin-mozjpeg'
Gulp[5]='gulp-imagemin-zopfli'
Gulp[6]='gulp-imagemin-giflossy'
Gulp[7]='gulp-imagemin-webp'
Gulp[8]='gulp-sass'
Gulp[9]='gulp-htmlmin'
Gulp[10]='gulp-terser'
Gulp[11]='gulp-tslint'
Gulp[12]='gulp-typescript'
Gulp[13]='gulp-prettier'
Gulp[14]='gulp-sass'
Gulp[15]='gulp-ext-replace'
Gulp[16]='gulp'

yarn init

for project in "${Projects[@]}"
do
    yard add -D $project
done

for gulp in "${Gulp[@]}"
do
    yard add -D $gulp
done

mkdir sass
mkdir ts
mkdir -p src/css
mkdir src/img
mkdir src/js
echo "node_modules" > .gitignore
echo "$(curl -fsSL https://raw.githubusercontent.com/TheWhiteWolf1337/template/master/gulpfile.js)" > gulpfile.js
echo "$(curl -fsSL https://raw.githubusercontent.com/TheWhiteWolf1337/template/master/ts/tsconfig.json)" > ts/tsconfig.json
echo "$(curl -fsSL https://raw.githubusercontent.com/TheWhiteWolf1337/template/master/ts/tslint.json)" > ts/tslint.json
