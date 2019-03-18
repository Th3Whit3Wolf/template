#!/usr/bin/env bash

set -e

Projects[0]='autoprefixer'
Projects[1]='eslint'
Projects[2]='eslint-config-prettier'
Projects[3]='events'
Projects[4]='prettier-stylelint'
Projects[5]='stylelint-config-idiomatic-order'
Projects[6]='tslint'
Projects[7]='tslint-config-prettier'
Projects[8]='tslint-plugin-prettier'
Projects[9]='typescript'

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

if [ -x "$(yarn)" ]; then
    yarn init

    for project in "${Projects[@]}"
    do
        yard add $project --save-dev
    done

    for gulp in "${Gulp[@]}"
    do
        yard add $gulp --save-dev
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
elif [ -x "$(npm)" ]; then
    npm init

    for project in "${Projects[@]}"
    do
        npm install -D $project
    done

    for gulp in "${Gulp[@]}"
    do
        npm install -D $gulp
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
else
    echo "Npm or yarn are required to utilize this template and to use javascript."
fi