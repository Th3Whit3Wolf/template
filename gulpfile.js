const gulp = require('gulp'),
	cssnano = require('gulp-cssnano'),
	cache = require('gulp-cache'),
	imagemin = require('gulp-imagemin'),
	imageminPngquant = require('imagemin-pngquant'),
	imageminMozjpeg = require('imagemin-mozjpeg'),
	imageminZopfli = require('imagemin-zopfli'),
	imageminGiflossy = require('imagemin-giflossy'),
	webp = require('imagemin-webp'),
	htmlmin = require('gulp-htmlmin'),
	terser = require('gulp-terser'),
	tslint = require('gulp-tslint'),
	ts = require('gulp-typescript'),
	sass = require('gulp-sass'),
	prettier = require('gulp-prettier'),
	extReplace = require('gulp-ext-replace')

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

// Convert jpeg & png to webp
gulp.task('webp', () =>
	gulp
		.src([src.img + '*.{png,jpg}'])
		.pipe(
			imagemin([
				webp({
					quality: 60
				})
			])
		)
		.pipe(extReplace('.webp'))
		.pipe(gulp.dest(dist.img))
)

//compress all images
gulp.task('imageMin', () =>
	gulp
		.src([src.img + '*.{gif,png,jpg,svg}'])
		.pipe(
			cache(
				imagemin([
					//png
					imageminPngquant({
						speed: 1,
						quality: [0.7, 0.8] //lossy settings
					}),
					imageminZopfli({
						more: true,
						iterations: 50 // very slow but more effective
					}),
					//gif
					// imagemin.gifsicle({
					//     interlaced: true,
					//     optimizationLevel: 3
					// }),
					//gif very light lossy, use only one of gifsicle or Giflossy
					imageminGiflossy({
						optimizationLevel: 3,
						optimize: 3, //keep-empty: Preserve empty transparent frames
						lossy: 2
					}),
					//svg
					imagemin.svgo({
						plugins: [
							{
								removeViewBox: false
							}
						]
					}),
					//jpg lossless
					imagemin.jpegtran({
						progressive: true
					}),
					//jpg very light lossy, use vs jpegtran
					imageminMozjpeg({
						quality: 85
					})
				])
			)
		)
		.pipe(gulp.dest(dist.img))
)

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
		gulp.parallel('copyHtml', 'imageMin', 'webp', 'ts', 'sass'),
		'message1',
		gulp.parallel('minjs', 'mincss'),
		'message2'
	)
)

gulp.task('watch', function() {
	gulp.watch(src.ts + '*.ts', gulp.series('tslint', 'ts', 'minjs'))
	gulp.watch(src.img + '*.{png,jpg}', gulp.parallel('imageMin', 'webp'))
	gulp.watch(src.img + '*.{gif,svg}', gulp.series('imageMin'))
	gulp.watch(src.sass + '*.scss', gulp.series('sass', 'mincss'))
})
