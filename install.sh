#!/usr/bin/env bash

set -e

Projects[0]='autoprefixer'
Projects[1]='eslint'
Projects[2]='eslint-config-prettier'
Projects[3]='gulp'
Projects[4]='gulp-autoprefixer'
Projects[5]='gulp-cssnano'
Projects[6]='gulp-eslint'
Projects[7]='gulp-plumber'
Projects[8]='gulp-notify'
Projects[9]='gulp-sass'
Projects[10]='gulp-sourcemaps'
Projects[11]='gulp-stylelint'
Projects[12]='gulp-tslint'
Projects[13]='gulp-typescript'
Projects[14]='gulp-uglify'
Projects[15]='node-sass'
Projects[16]='through2'
Projects[17]='prettier-stylelint'
Projects[18]='stylelint-config-idiomatic-order'
Projects[19]='tslint'
Projects[20]='tslint-config-prettier'
Projects[21]='tslint-microsoft-contrib'
Projects[22]='typescript'

yarn init

for project in "${Projects[@]}"
do
    yard add -D $project
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
