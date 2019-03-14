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

```sh
    .
    ├── sass                # SASS files
    ├── src
    │   ├── css             # Compiled CSS Files
    │   ├── img             # Images go here
    │   ├── js              # Compiled Javascript
    │   └ html
    ├── ts
    │   ├── tsconfig.json   # TS Config
    │   ├── tslint.json     # TS Lint
    │   └ typescript
    ├ .gitignore
    ├ gulpfile.js
    ├ LICENSE (MIT)
    └ package.json
```

### Start new project with this template

```bash
mkdir project_name #replace project_name with what you'd like to name your project
cd project_name
sh -c "$(curl -fsSL https://raw.githubusercontent.com/TheWhiteWolf1337/template/master/install.sh)"
```
