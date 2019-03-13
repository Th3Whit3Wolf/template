# Web Development Template

My template for web development with typescript, sass, gulp, and linting.

### Features

-   Typescript in own folder
-   Tsconfig and Tslint in Typescript folder
-   Sass in own folder
-   Sass gets compiled to src/css
-   Typescript gets compiled to src/js
-   Linting:
    -   Typescript: Tslint
    -   Javascript: Eslint
    -   SASS/LESS/CSS: Stylelint

### Project Structure

    .
    ├── sass
    │   └── sass files
    ├── src
    │   ├── css
    │   │   └── compiled css
    │   ├── img
    │   │   └── images
    │   ├── js
    │   │   └── compiled javascript
    │   └── html files
    ├── ts
    │   │
    │   ├── tsconfig.json
    │   ├── tslint.json
    │   └── typescript files
    ├── .gitignore
    ├── gulpfile.js
    ├── LICENSE (MIT)
    └── package.json

### Start new project with this template

`sh -c "$(curl -fsSL https://raw.githubusercontent.com/TheWhiteWolf1337/template/master/install.sh)"`
