# Web Development Template

My template for web development with typescript, sass, gulp, and linting.

### Features

-   Typescript, SASS, CSS, Javascript, and images are in their own folder
-   Tsconfig and Tslint tucked away in Typescript folder
-   Sass gets compiled to src/css
-   Typescript gets compiled to src/js
-   All distributed files get minimized
-   Highest Quality Image compression
-   Webp Image generation
-   Javascript files in src still get formatted
-   Purify CSS to remove unused CSS
-   Linting:
    -   Typescript: Tslint
    -   Javascript: Eslint
    -   SASS/LESS/CSS: Stylelint

### Project Structure
f
```sh
    .
    ├── src                     # These are you source files that you will work with
    │   ├── css                 # Compiled CSS Files
    │   ├── fonts               # For ttf, otf, woff, & woff2
    │   ├── img                 # Images Go Here
    │   ├── js                  # Compiled Javascript
    │   ├── sass                # Sass Files Go Here
    │   ├── ts                  # Typescript Files Go Here
    │   │   ├─ tsconfig.json    # TS Config
    │   │   ├─ tslint.json      # TS Lint
    │   │   └ typescript
    │   ├ html
    │   └ sitemap
    ├── dist                    # These are the minimized files you want to distribute
    │   ├── css                 # Minimized CSS Files
    │   ├── fonts               # For ttf, otf, woff, & woff2
    │   ├── img                 # Minimized Images Go Here
    │   ├── js                  # Minimized Javascript
    │   ├ html
    │   └ sitemap
    ├ .gitignore
    ├ gulpfile.js
    └ package.json
```

### Start new project with this template

```bash
mkdir project_name #replace project_name with what you'd like to name your project
cd project_name
sh -c "$(curl -fsSL https://raw.githubusercontent.com/Th3Whit3Wolf/template/master/install.sh)"
```

### Prequisites

yarn or npm must be install to install node packages

### Time

yarn completes in about 40 seconds
npm completes in just over 2 minutes

### Recomendations

This template runs init -y for yarn and npm to make the initiliaztion faster and to remove any unnecessary user input.

To make it more convenient for you I recomend running:

````bash
npm config set init.author.name "You Name"
npm config set init.author.email "Email you'd like people to contact you at"
npm config set init.author.url "url for your app or site"
npm config set init.license LICENSE-YOU-WILL-MOST-WANT```
````

This will set the default setting for npm & yarn init
