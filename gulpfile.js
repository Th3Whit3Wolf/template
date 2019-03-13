'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const eslint = require('gulp-eslint');
const stylelint = require('gulp-stylelint');
const plumber = require('gulp-plumber');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const ts = require('gulp-typescript');
const tslint = require('gulp-tslint');
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');

// PATHS
const scripts = {
	java: './src/js/',
	type: './ts/',
};

const styles = {
	sass: './sass/',
	css: './css/',
};

const templates = {
	templatePath: './WebsiteTemplates/BaseTemplate/',
	templateThemePath: './WebsiteTemplates/BaseTemplate/App_Themes/BaseTheme/',
};

const tsPath = PATH.templatePath + PATH.javascript.typescriptFolder;
const jsPath = PATH.templatePath + PATH.javascript.jsFolder;
const sassPath = PATH.templateThemePath + PATH.stylesheet.sassFolder;
const cssPath = PATH.templateThemePath + PATH.stylesheet.cssFolder;

var AUTOPREFIXER_BROWSERS = [
	'Android 2.3',
	'Android >= 4',
	'Chrome >= 20',
	'Firefox >= 24',
	'Explorer >= 9',
	'iOS >= 6',
	'Opera >= 12',
	'Safari >= 6',
];

// SASS
gulp.task('sass', function() {
	// configure postcss + load modules
	var sassConfig = sass({
		outputStyle: 'compressed',
	});

	// configure error message via notify
	var errorHandler = notify.onError(function(error) {
		return 'POSTCSS error: ' + error.message;
	});

	return gulp
		.src(styles.sass + '**/*.scss') // file input
		.pipe(
			stylelint({
				failAfterError: false,
				reporters: [
					{ formatter: 'string', console: true },
					{ formatter: 'verbose', console: true },
				],
			})
		)
		.pipe(sourcemaps.init()) // create sourcemaps
		.pipe(sassConfig) // configure postcss
		.on('error', errorHandler) // report errors via notify
		.pipe(plumber()) // continues gulp build on error
		.pipe(autoprefixer()) // browser prefixing
		.pipe(sourcemaps.write()) // write sourcemaps to disk
		.pipe(gulp.dest(styles.css)); // write css to disk
});

// TSLINT
gulp.task('tslint', () => {
	const tsLintConfig = tslint({
		configuration: script.type + 'tslint.json',
	});

	return gulp
		.src(scripts.type + '*.ts')
		.pipe(tsLintConfig)
		.pipe(tslint.report());
});

// TYPESCRIPT
gulp.task('ts', function() {
	const tsConfig = ts.createProject(script.type + 'tsconfig.json');

	// configurable typescript settings w/o tsconfig.json
	/*var tsConfig =
	typescript({ */
	// target: "ESNext",						/* Specify ECMAScript target version: 'ES3' (default), 'ES5', 'ES2015', 'ES2016', 'ES2017','ES2018' or 'ESNEXT'. */
	//module: "ESNext",						/* Specify module code generation: 'none', 'commonjs', 'amd', 'system', 'umd', 'es2015', or 'ESNext'. */
	// lib: [
	//	"es2018",
	//	"dom",
	//	"dom.iterable"
	//  ],										/* Specify library files to be included in the compilation. */
	// noLib: false,							/* (boolean) - Don't include the default lib (with definitions for - Array, Date etc) */
	// allowJs: true,								/* Allow javascript files to be compiled. */
	// checkJs: true,								/* Report errors in .js files. */
	// jsx: preserve,								/* Specify JSX code generation: 'preserve', 'react-native', or 'react'. */
	// declaration: true,							/* Generates corresponding '.d.ts' file. */
	// outFile: jsPath + '/main.js',			/* Concatenate and emit output to single file. */
	// outDir: jsPath,								/* Redirect output structure to the directory. */
	// rootDir: "./typescript",					/* Specify the root directory of input files. Use to control the output directory structure with outDir. */
	// removeComments: true,					/* Do not emit comments to output. */
	// strict: true,								/* Enable all strict type-checking options. */
	// noImplicitAny: true,						/* Raise error on expressions and declarations with an implied 'any' type. */
	// strictNullChecks: true,						/* Enable strict null checks. */
	// strictFunctionTypes: true,					/* Enable strict checking of function types. */
	// strictBindCallApply: true,					/* Enable strict 'bind', 'call', and 'apply' methods on functions. */
	// strictPropertyInitialization: true,			/* Enable strict checking of property initialization in classes. */
	// noImplicitThis: true,					/* Raise error on 'this' expressions with an implied 'any' type. */
	// alwaysStrict: true,						/* Parse in strict mode and emit "use strict" for each source file. */
	// emitDecoratorMetadata: true,				/* Enables experimental support for emitting type metadata for decorators. */
	// experimentalDecorators: true,			/* Enables experimental support for ES7 decorators. */
	// experimentalAsyncFunctions: true,		/*(boolean) - Support for ES7-proposed asynchronous functions using the async/await keywords (TS1.6+). */
	// moduleResolution: true,					/* (string) - Determine how modules get resolved. Either 'node' for Node.js/io.js style resolution, or 'classic' (default) (TS1.6+). */
	// suppressImplicitAnyIndexErrors: true,	/* boolean) - Suppress noImplicitAny errors for indexing objects lacking index signatures. */
	// moduleResolution: "node",				/* Specify module resolution strategy: 'node' (Node.js) or 'classic' (TypeScript pre-1.6). */
	// noEmitOnError: true,             		/* (boolean) - Do not emit outputs if any type checking errors were reported. */
	// noEmitHelpers: true,    					/* (boolean) - Do not generate custom helper functions like __extends in compiled output. */
	// preserveConstEnums: true,					/* (boolean) - Do not erase const enum declarations in generated code. */
	//
	//});

	// configure error message via notify
	var errorHandler = notify.onError(function(error) {
		return 'JavaScript error: ' + error.message;
	});

	return gulp
		.src(scripts.type + '*.ts') // input files
		.pipe(
			eslint({
				fix: true,
				parser: 'typescript-eslint-parser',
			})
		)
		.pipe(eslint.format())
		.pipe(tsConfig) // allows use of tsconfig.json hidden in ts folder
		.on('error', errorHandler) // report error via notify
		.pipe(plumber()) // continue gulp build on error
		.pipe(sourcemaps.init()) // create sourcemaps
		.pipe(sourcemaps.write()) // write sourcemaps to disk
		.pipe(gulp.dest(scripts.java)); // write js to disk
});

// WATCH
gulp.task('watch', function() {
	gulp.watch(styles.sass + '*.scss', ['sass']); // watch css for changes
	gulp.watch(scripts.type + '*.ts', ['ts'], ['tslint']); // watch ts for changes
});

// DEFAULT
gulp.task('default', ['sass', 'ts', 'tslint', 'watch']); // default task to run
