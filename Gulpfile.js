'use strict';

// Load plugins
var gulp = require('gulp');
var gutil   = require('gulp-util');
var plugins = require('gulp-load-plugins')();

// Source and destination paths for tasks:
var path = {
  src:   './app/src',
  dest:  './app/public',
  npm:   './node_modules',
  // Path to /app/public on the staging environment (for rsync):
  stage: 'user@servername:/path/to/site/app/public'
};

// Default Gulp task:
gulp.task('default', [
  'styles',
  'browserify',
  'images',
  'modernizr'
]);

// Watch tasks:
gulp.task('watch', [
  'watch:scripts',
  'watch:styles',
  'watch:gulpfile'
]);

gulp.task('watch:gulpfile', function(){
  gulp.watch('Gulpfile.js', [
    'jshint'
  ]);
});

gulp.task('watch:scripts', function(){
  gulp.watch(path.src + '/scripts/**/*.js', [
    'jshint',
    'browserify'
  ]);
});

gulp.task('watch:styles', function(){
  gulp.watch(path.src + '/styles/**/*.scss', [
    'styles'
  ]);
});

// Images:
gulp.task('images', function(){
  var src  = path.src  + '/images/{,*/}*.{gif,jpg,png,svg}';
  var dest = path.dest + '/images';

  return gulp.src(src)
    // Only process new / updated images:
    .pipe(plugins.newer(dest))
    // Minify images:
    .pipe(plugins.imagemin({
      progressive: true,
      interlaced: true,
      svgoPlugins: [
        { cleanupIDs: false },
        { removeDoctype: false } // Keeps IE happy
      ]
    }))
    .pipe(gulp.dest(dest));
});

// Styles (compile / autoprefix / minify):
gulp.task('styles', function(){
  gulp.src(path.src + '/styles/main.scss')
    // Compile Sass:
    .pipe(plugins.sass.sync({
        includePaths: [
          path.npm + '/bourbon/app/assets/stylesheets',
          path.npm + '/bourbon-neat/app/assets/stylesheets',
          path.npm + '/node.normalize.scss'
        ]
      })
      .on('error', plugins.sass.logError)
    )
    // Autoprefix:
    .pipe(plugins.autoprefixer({
      browsers: [
        'last 3 versions',
        'ie 8',
        'ie 9'
      ]
    }))
    // Write main.css
    .pipe(gulp.dest(path.dest + '/styles'))
    // Report file size:
    .pipe(plugins.size({ showFiles: true }))
    // Minify main.css and rename it to 'main.min.css':
    .pipe(plugins.cssmin())
    .pipe(plugins.rename({suffix: '.min'}))
    .pipe(plugins.size({ showFiles: true }))
    .pipe(gulp.dest(path.dest + '/styles'))
    .on('error', gutil.log);
});

// Browserify:
gulp.task('browserify', function(){
  gulp.src(path.src + '/scripts/main.js')
    .pipe(plugins.browserify())
    .pipe(plugins.rename('bundle.js'))
    .pipe(gulp.dest(path.dest + '/scripts'))
    .pipe(plugins.size({ showFiles: true }))
    .on('error', gutil.log);
});

// JSHint:
gulp.task('jshint', function(){
  var src  = [
    'Gulpfile.js',
    path.src  + '/scripts/{,*/}*.js'
  ];

  gulp.src(src)
    .pipe(plugins.jshint())
    .pipe(plugins.jshint.reporter(require('jshint-stylish')));
});

// Modernizr custom build:
gulp.task('modernizr', function(){
  var src = [
    path.dest + '/scripts/bundle.js',
    path.dest + '/styles/main.css'
  ];

  gulp.src(src)
    .pipe(plugins.modernizr())
    .pipe(plugins.uglify())
    .pipe(gulp.dest(path.dest + '/scripts'))
    .pipe(plugins.size({ showFiles: true }))
    .on('error', gutil.log);
});
