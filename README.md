# Web Development Template

My template for web development with typescript, sass, gulp, and linting.

### Features

-   Typescript, SASS, CSS, Javascript, and images are in their own folder
-   Tsconfig and Tslint tucked away in Typescript folder
-   Sass gets compiled to src/css
-   Typescript gets compiled to src/js
-   All distributed files get minimized
-   High Quality Image compression
-   Webp Image generation
-   Javascript files in src still get formatted
-   Linting:
    -   Typescript: Tslint
    -   Javascript: Eslint
    -   SASS/LESS/CSS: Stylelint

### Project Structure

```sh
    .
    ├── src                     # These are you source files that you will work with
    │   ├── css                 # Compiled CSS Files
    │   ├── img                 # Images Go Here
    │   ├── js                  # Compiled Javascript
    │   ├── sass                # Sass Files Go Here
    │   ├── ts                  # Typescript Files Go Here
    │   │   ├── tsconfig.json   # TS Config
    │   │   ├── tslint.json     # TS Lint
    │   │   └ typescript
    │   └ html
    ├── dist                    # These are the minimized files you want to distribute
    │   ├── css                 # Minimized CSS Files
    │   ├── img                 # Minimized Images Go Here
    │   └── js                  # Minimized Javascript
    ├ .gitignore
    ├ gulpfile.js
    └ package.json
```

### Start new project with this template

```bash
mkdir project_name #replace project_name with what you'd like to name your project
cd project_name
sh -c "$(curl -fsSL https://raw.githubusercontent.com/TheWhiteWolf1337/template/master/install.sh)"
```
