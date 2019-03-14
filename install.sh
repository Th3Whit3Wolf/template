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
Projects[8]='gulp-sass'
Projects[9]='gulp-sourcemaps'
Projects[10]='gulp-typescript'
Projects[11]='gulp-uglify'
Projects[12]='gulp-uglify'
Projects[13]='node-sass'
Projects[14]='through2'
Projects[15]='prettier-stylelint'
Projects[16]='stylelint-config-idiomatic-order'
Projects[17]='tslint-config-prettier'
Projects[18]='tslint-microsoft-contrib'
Projects[19]='typescript'

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



#bit u && sh -c "$(curl -fsSL https://raw.githubusercontent.com/TheWhiteWolf1337/template/master/install.sh)"
