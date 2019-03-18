#!/usr/bin/env bash

set -e

Projects[0]='eslint'
Projects[1]='eslint-config-prettier'
Projects[2]='events'
Projects[3]='prettier-stylelint'
Projects[4]='stylelint-config-idiomatic-order'
Projects[5]='tslint'
Projects[6]='tslint-config-prettier'
Projects[7]='tslint-plugin-prettier'
Projects[8]='typescript'

Gulp[0]='gulp'
Gulp[1]='gulp-connect'
Gulp[2]='gulp-cssnano'
Gulp[3]='gulp-gh-pages'
Gulp[4]='gulp-htmlmin'
Gulp[5]='gulp-image'
Gulp[6]='gulp-postcss'
Gulp[7]='gulp-prettier'
Gulp[8]='gulp-pretty-data'
Gulp[9]='gulp-purifycss'
Gulp[10]='gulp-sass'
Gulp[11]='gulp-sitemap'
Gulp[12]='gulp-string-replace'
Gulp[13]='gulp-stylelint'
Gulp[14]='gulp-terser'
Gulp[15]='gulp-tslint'
Gulp[16]='gulp-typescript'
Gulp[17]='gulp-prettier'
Gulp[18]='gulp-webp'


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
