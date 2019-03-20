#!/usr/bin/env bash

set -e

Projects[0]='autoprefixer'
Projects[1]='eslint'
Projects[2]='eslint-plugin-prettier'
Projects[3]='eslint-config-prettier'
Projects[4]='events'
Projects[5]='google-closure-compiler'
Projects[6]='prettier'
Projects[7]='prettier-stylelint'
Projects[8]='stylelint'
Projects[9]='stylelint-config-idiomatic-order'
Projects[10]='tslint'
Projects[11]='tslint-config-prettier'
Projects[12]='tslint-plugin-prettier'
Projects[13]='typescript'

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
Gulp[14]='gulp-tslint'
Gulp[15]='gulp-typescript'
Gulp[17]='gulp-webp'

if yarn -v /dev/null 2>&1; then

    yarn init -y

    for project in "${Projects[@]}"
    do
        list=$list" $project"
    done

    for gulp in "${Gulp[@]}"
    do
        list=$list" $gulp"
    done

	yarn add $list --save-dev

    mkdir sass
    mkdir ts
    mkdir -p src/css
    mkdir src/img
    mkdir src/js
    echo "node_modules" > .gitignore
    echo "$(curl -fsSL https://raw.githubusercontent.com/TheWhiteWolf1337/template/master/gulpfile.js)" > gulpfile.js
    echo "$(curl -fsSL https://raw.githubusercontent.com/TheWhiteWolf1337/template/master/ts/tsconfig.json)" > ts/tsconfig.json
    echo "$(curl -fsSL https://raw.githubusercontent.com/TheWhiteWolf1337/template/master/ts/tslint.json)" > ts/tslint.json
elif npm -v /dev/null 2>&1; then
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

BADLINESCOUNT=1
ORIGINALFILE=$PWD/package.json
dd if=${ORIGINALFILE} of=${ORIGINALFILE}.tmp status=none bs=1 count=$(printf "$(stat --format=%s ${ORIGINALFILE}) - $(tail -n${BADLINESCOUNT} ${ORIGINALFILE} | wc -c)\n" | bc )
/bin/mv -f ${ORIGINALFILE}.tmp ${ORIGINALFILE}
sed '${s/$/,/}' $PWD/package.json > $PWD/package.json
