const gulp = require('gulp'),
	cssnano = require('gulp-cssnano'),
	image = require('gulp-image'),
	webp = require('gulp-webp'),
	htmlmin = require('gulp-htmlmin'),
	terser = require('gulp-terser'),
	tslint = require('gulp-tslint'),
	ts = require('gulp-typescript'),
	sass = require('gulp-sass'),
	prettier = require('gulp-prettier'),
	connect = require('gulp-connect'),
	sitemap = require('gulp-sitemap'),
	replace = require('gulp-string-replace'),
	prettyData = require('gulp-pretty-data'),
	deploy = require('gulp-gh-pages'),
	gulpStylelint = require('gulp-stylelint'),
	EventEmitter = require('events'),
	purify = require('gulp-purifycss'),
	autoprefixer = require('autoprefixer'),
	postcss = require('gulp-postcss')

// Paths
const src = {
	css: './src/css/',
	fonts: './src/fonts/',
	img: './src/img/',
	js: './src/js/',
	sass: './src/sass/',
	ts: './src/ts/'
}

const dist = {
	css: './dist/css/',
	fonts: './dist/fonts/',
	img: './dist/img/',
	js: './dist/js/'
}

/*
 -- TOP LEVEL FUNCTIONS --
    gulp.task  - Define tasks
    gulp.src   - Point to files to use
    gulp.dest  - Points to folders to ouput
    gulp.watch - Watch files and folders for changes
*/

// Create Local Server
gulp.task('connect', function() {
	const emitter = new EventEmitter()

	connect.server({
		root: 'src',
		livereload: false,
		port: 8000
	})
	setTimeout(() => emitter.emit('finish'), 300)
	return emitter
})

gulp.task('disconnect', function(cb) {
	const emitter = new EventEmitter()

	connect.serverClose()
	setTimeout(() => emitter.emit('finish'), 700)
	return emitter
})

gulp.task('connect', function() {
	const emitter = new EventEmitter()

	connect.server({
		root: 'src',
		livereload: true,
		port: 8000
	})
	setTimeout(() => emitter.emit('finish'), 500)
	return emitter
})

// Map the local server
gulp.task('sitemapper', function(cb) {
	gulp.src('src/**/*.html', {
		read: false
	})
		.pipe(
			sitemap({
				siteUrl: 'http://localhost:8000'
			})
		)
		.pipe(gulp.dest('./src/'))
		.on('end', cb)
})

// Replace local server with site
gulp.task('sitemapped', function(cb) {
	return gulp
		.src('src/sitemap.xml')
		.pipe(
			replace(
				'http://localhost:8000/',
				'https://thewhitewolf1337.github.io/my_portfolio/'
			)
		)
		.pipe(gulp.dest('./src/'))
		.on('end', cb)
})

// Copy & Minify All XML files
gulp.task('copyXml', function(cb) {
	gulp.src('src/*.xml')
		.pipe(
			prettyData({
				type: 'minify',
				preserveComments: true
			})
		)
		.pipe(gulp.dest('dist'))
		.on('end', cb)
})

gulp.task('copySrc', function(cb) {
	gulp.series('copyFavicon', 'copySWM', 'copyApl', 'copyAnd')(cb)
})

gulp.task('copyFavicon', function(cb) {
	gulp.src('src/favicon*')
		.pipe(gulp.dest('dist'))
		.on('end', cb)
})

gulp.task('copySWM', function(cb) {
	gulp.src('src/site.webmanifest')
		.pipe(gulp.dest('dist'))
		.on('end', cb)
})

gulp.task('copyApl', function(cb) {
	gulp.src('src/apple-touch-icon.png')
		.pipe(gulp.dest('dist'))
		.on('end', cb)
})

gulp.task('copyAnd', function(cb) {
	gulp.src('src/android*')
		.pipe(gulp.dest('dist'))
		.on('end', cb)
})

// Copy & Minify All XML files
gulp.task('copyFonts', function(cb) {
	gulp.src(src.fonts)
		.pipe(gulp.dest(dist.fonts))
		.on('end', cb)
})

// Deploy to Github Pages
gulp.task('deploy', function() {
	return gulp.src('./dist/**/*').pipe(deploy())
})

// Copy & Minify All HTML files
gulp.task('copyHtml', function(cb) {
	gulp.src('src/*.html')
		.pipe(htmlmin({ collapseWhitespace: true }))
		.pipe(gulp.dest('dist'))
		.on('end', cb)
})

// Optimize all images
gulp.task('image', function(cb) {
	gulp.src(src.img + '**/*')
		.pipe(
			image({
				optipng: ['-i 1', '-strip all', '-fix', '-o7', '-force'],
				pngquant: ['--speed=1', '--force', 256],
				zopflipng: ['-y', '--lossy_8bit', '--lossy_transparent'],
				jpegRecompress: [
					'--strip',
					'--quality',
					'medium',
					'--min',
					40,
					'--max',
					80
				],
				mozjpeg: ['-optimize', '-progressive'],
				guetzli: ['--quality', 85],
				gifsicle: ['--optimize'],
				svgo: ['--enable', 'cleanupIDs', '--disable', 'convertColors'],
				concurrent: 10,
				quiet: false // defaults to false
			})
		)
		.pipe(gulp.dest(dist.img))
		.on('end', cb)
})

// Generate webp images
gulp.task('webp', () =>
	gulp
		.src(dist.img + '**/*')
		.pipe(webp())
		.pipe(gulp.dest(dist.img))
)

// Generate webp images in src
gulp.task('wbps', () =>
	gulp
		.src(src.img + '**/*')
		.pipe(webp())
		.pipe(gulp.dest(src.img))
)

// Copy & Minify all CSS files
gulp.task('mincss', function(cb) {
	gulp.src(src.css + '*.css')
		.pipe(cssnano())
		.pipe(gulp.dest(dist.css))
		.on('end', cb)
})

// Compile SASS
gulp.task('sass', function(cb) {
	gulp.src(src.sass + '*.scss')
		.pipe(sass.sync().on('error', sass.logError))
		.pipe(postcss([autoprefixer()]))
		.pipe(
			purify([src.ts + '**/*.ts', './src/**/*.html'], {
				info: true, // Outputs reduction information (like in the screenshot above)
				minify: true, // Minifies the files after reduction
				rejected: false, // Logs the CSS rules that were removed
				whitelist: ['*transition*', '*dimmer*'] // Ignored css classes
			})
		)
		.pipe(
			gulpStylelint({
				fix: true
			})
		)
		.pipe(gulp.dest(src.css))
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

// Make main.js prettier to look at
gulp.task('prettyJs', function(cb) {
	gulp.src(src.js + '*.js')
		.pipe(
			prettier({
				printWidth: 80,
				tabWidth: 4,
				useTabs: true,
				singleQuote: true,
				trailingComma: 'none',
				bracketSpacing: true,
				jsxBracketSameLine: false
			})
		)
		.pipe(gulp.dest(src.js))
		.on('end', cb)
})

// Compile Typescript
gulp.task('ts', function(cb) {
	const tsConfig = ts.createProject(src.ts + 'tsconfig.json')
	gulp.src(src.ts + '*.ts')
		.pipe(tsConfig())
		.pipe(gulp.dest(src.js))
		.on('end', cb)
})

gulp.task('tslint', () =>
	gulp
		.src(src.ts + '*.ts')
		.pipe(
			tslint({
				formatter: 'prose',
				configuration: src.ts + 'tslint.json'
			})
		)
		.pipe(
			tslint.report({
				emitError: true,
				reportLimit: 2,
				summarizeFailureOutput: false,
				allowWarnings: false
			})
		)
)

// Make a sitemp
gulp.task('sitemap', function(cb) {
	gulp.series('sites', 'sitemapped', 'copyXml', 'disconnect')(cb)
})

// Makes
gulp.task('sites', function(cb) {
	gulp.parallel('connect', 'sitemapper')(cb)
})

// Run All SASS/CSS Tasks
gulp.task('css', function(cb) {
	gulp.series('sass', 'mincss')(cb)
})

// Run all Typesctipt/Javascript Tasks
gulp.task('javascript', function(cb) {
	gulp.series('tslint', 'ts', 'minjs', 'prettyJs')(cb)
})

// Run all image related tasks
gulp.task('images', function(cb) {
	gulp.series('image', 'webp', 'wbps')(cb)
})

gulp.task('default', function(cb) {
	gulp.series(
		'copySrc',
		'copyHtml',
		'javascript',
		'css',
		'sitemap',
		'copyFonts'
	)(cb)
})

gulp.task('full', function(cb) {
	gulp.series(
		gulp.parallel('copyHtml', 'javascript', 'css', 'sitemap', 'images')(cb)
	)
})

gulp.task('watch', function(done) {
	gulp.watch(
		src.ts + '*.ts',
		gulp.parallel('tslint', 'ts', 'minjs', 'prettyJs')
	)
	gulp.watch(src.img + '*', gulp.parallel('image', 'webp'))
	gulp.watch(src.sass + '*.scss', gulp.series('sass', 'mincss'))
	done
})

// Notification Messages
gulp.task('hw', function() {
	return new Promise(function(resolve, reject) {
		resolve(console.log('Hello World'))
	})
})
