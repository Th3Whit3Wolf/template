const gulp = require('gulp'),
	cssnano = require('gulp-cssnano'),
	imagemin = require('gulp-imagemin'),
	htmlmin = require('gulp-htmlmin'),
	terser = require('gulp-terser'),
	tslint = require('gulp-tslint'),
	ts = require('gulp-typescript'),
	sass = require('gulp-sass'),
	prettier = require('gulp-prettier')

// Paths
const src = {
	css: './src/css/',
	img: './src/img/',
	js: './src/js/',
	sass: './src/sass/',
	ts: './src/ts/'
}

const dist = {
	css: './dist/css/',
	img: './dist/img/',
	js: './dist/js/'
}

// pull in the project Typescript config
const tsProject = ts.createProject(src.ts + 'tsconfig.json')

/*
 -- TOP LEVEL FUNCTIONS --
    gulp.task  - Define tasks
    gulp.src   - Point to files to use
    gulp.dest  - Points to folders to ouput
    gulp.watch - Watch files and folders for changes
*/

// Notification Messages
gulp.task('message1', function() {
	return new Promise(function(resolve, reject) {
		console.log('Stage 1 Complete')
		resolve()
	})
})

// Notification Messages
gulp.task('message2', function() {
	return new Promise(function(resolve, reject) {
		console.log('Minification Complete')
		resolve()
	})
})

// Copy All HTML files
gulp.task('copyHtml', function(cb) {
	gulp.src('src/*.html')
		.pipe(htmlmin({ collapseWhitespace: true }))
		.pipe(gulp.dest('dist'))
		.on('end', cb)
})

// Copy & Minify all CSS files
gulp.task('mincss', function(cb) {
	gulp.src(src.css + '*.css')
		.pipe(cssnano())
		.pipe(gulp.dest(dist.css))
		.on('end', cb)
})

// Optimize Images
gulp.task('imageMin', function(cb) {
	gulp.src(src.img + '*')
		.pipe(imagemin())
		.pipe(gulp.dest(dist.img))
		.on('end', cb)
})

// Minify JS
gulp.task('minjs', function(cb) {
	gulp.src(src.js + '*.js')
		.pipe(
			terser({
				// see https://github.com/terser-js/terser#minify-options for options
				parse: {
					// parse options
				},
				compress: {
					// compress options
					ecma: 6
				},
				mangle: {
					// mangle options

					properties: {
						// mangle property options
					}
				},
				output: {
					// output options
					ecma: 6
				},
				sourceMap: {
					// source map options
				},
				ecma: 8, // specify one of: 5, 6, 7 or 8
				keep_classnames: true,
				keep_fnames: true,
				ie8: false,
				module: false,
				nameCache: null, // or specify a name cache object
				safari10: false,
				toplevel: false,
				warnings: false
			})
		)
		.pipe(gulp.dest(dist.js))
		.on('end', cb)
})

// Compile SASS
gulp.task('sass', function(cb) {
	gulp.src(src.sass + '*.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest(src.css))
		.on('end', cb)
})

// Compile Typescript
gulp.task('ts', () => {
	const tsResult = tsProject
		.src()
		.pipe(tsProject())
		.pipe(
			prettier({
				printWidth: 80,
				tabWidth: 4,
				useTabs: true,
				singleQuote: true,
				trailingComma: none,
				bracketSpacing: true,
				jsxBracketSameLine: false
			})
		)
	return tsResult.js.pipe(gulp.dest(src.js))
})

gulp.task('tslint', () =>
	gulp
		.src(src.ts + '*.ts')
		.pipe(
			tslint({
				configuration: src.ts + 'tslint.json'
			})
		)
		.pipe(
			tslint.report({
				allowWarnings: true
			})
		)
)

gulp.task(
	'default',
	gulp.series(
		gulp.parallel('copyHtml', 'imageMin', 'ts', 'sass'),
		'message1',
		gulp.parallel('minjs', 'mincss'),
		'message2'
	)
)

gulp.task('watch', function() {
	gulp.watch(src.ts + '*.ts', gulp.series('tslint', 'ts', 'minjs'))
	gulp.watch(src.img + '*', gulp.series('imageMin'))
	gulp.watch(src.sass + '*.scss', gulp.series('sass', 'mincss'))
})
