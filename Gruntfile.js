'use strict';

module.exports = function(grunt) {

  // Time how long tasks take. Can help when optimizing build times
  // (Doesn't seem to work with 'spawn: false' on watch task, though)
  // require('time-grunt')(grunt);

  // Load grunt tasks automatically
  require('jit-grunt')(grunt);

  // Source and destination paths for tasks:
  var path = {
    src:   'app/src',
    dest:  'app/public',
    bower: 'bower_components',
    // Path to /app/public on the staging environment (for rsync):
    stage: 'user@servername:/path/to/site/app/public'
  };

  /*
  * $ grunt
  * - Compiles SASS
  * - Bundles Javascript using Browserify
  * - Minifies CSS to main.min.css
  * - Optimises images
  * - Creates custom Modernizr build
  */
  grunt.registerTask('default', [
    'sass',
    'autoprefixer',
    'browserify',
    'cssmin',
    'imagemin',
    'svgmin',
    'modernizr'
  ]);

  /*
  * $ grunt watch
  * - Watches SASS for changes --> render to CSS, autoprefixes + minify
  * - Watches JS for changes --> bundle with Browserify
  * – Watch images and SVGs --> optimise and copy to public dir
  */

  // Set up tasks:
  grunt.initConfig({

    path: path,

    pkg: grunt.file.readJSON('package.json'),

    // Watch tasks:
    watch: {
      options: {
        // This significantly improves performance, but might not work
        // well with all grunt tasks - try setting to "true" if you run
        // into any problems
        spawn: false,
      },
      gruntfile: {
        files: ['Gruntfile.js'],
        tasks: ['jshint']
      },
      css: {
        files: ['<%= path.src %>/styles/**/*.scss'],
        tasks: ['sass', 'autoprefixer', 'cssmin']
      },
      scripts: {
        files: ['<%= path.src %>/scripts/**/*.js'],
        tasks: ['jshint', 'browserify']
      },
      images: {
        files: ['<%= path.src %>/images/**/*.{png,jpg,gif}'],
        tasks: ['newer:imagemin']
      },
      svg: {
        files: ['<%= path.src %>/images/**/*.svg'],
        tasks: ['newer:svgmin']
      }
    },

    // SASS config:
    sass: {
      dist: {
        options: {
          // Allow easy importing of bourbon and neat (via eg. @import "bourbon"):
          loadPath: [
            '<%= path.bower %>/bourbon/app/assets/stylesheets',
            '<%= path.bower %>/neat/app/assets/stylesheets',
            '<%= path.bower %>/normalize-scss'
          ]
        },
        files: {
          '<%= path.dest %>/styles/main.css': '<%= path.src %>/styles/main.scss'
        }
      }
    },

    // Add vendor prefixed styles
    autoprefixer: {
      options: {
        browsers: ['last 3 versions', 'ie 8', 'ie 9']
      },
      dist: {
        files: [{
          expand: true,
          cwd: '<%= path.dest %>/styles',
          src: '{,*/}*.css',
          dest: '<%= path.dest %>/styles'
        }]
      }
    },

    // Bundle Javascript modules into bundle.js:
    browserify: {
      all: {
        options: {
          browserifyOptions : {
            // debug: true
          }
        },
        src:  '<%= path.src %>/scripts/main.js',
        dest: '<%= path.dest %>/scripts/bundle.js'
      }
    },

    // Lint JS files with JSHint:
    jshint: {
        options: {
            // Continue with other tasks even if JSHint finds
            // stuff to complain about:
            force: true,
            // JSHint config file:
            jshintrc: '.jshintrc',
            // Make JSHint output look a little nicer:
            reporter: require('jshint-stylish')
        },
        all: [
            'Gruntfile.js',
            '<%= path.src %>/scripts/{,*/}*.js',
            '!<%= path.src %>/scripts/vendor/*'
        ]
    },

    // Minify CSS
    // (main.css --> main.min.css)
    cssmin: {
      dist: {
        files: {
          '<%= path.dest %>/styles/main.min.css': [
            '<%= path.dest %>/styles/main.css'
          ]
        }
      }
    },

    // Optimise images:
    imagemin: {
      all: {
        files: [{
          expand: true,
          cwd: '<%= path.src %>/images',
          src: ['**/*.{png,jpg,gif}'],
          dest: '<%= path.dest %>/images'
        }]
      }
    },

    // Optimise SVGs:
    svgmin: {
      options: {
        plugins: [
          { cleanupIDs: false },
          { removeDoctype: false } // Keeps IE happy
        ]
      },
      all: {
        files: [{
          expand: true,
          cwd: '<%= path.src %>/images',
          src: '{,*/}*.svg',
          dest: '<%= path.dest %>/images'
        }]
      }
    },

    // Generates a custom Modernizr build that includes only the tests you
    // reference in your app
    modernizr: {
      dist: {
        devFile: '<%= path.bower %>/modernizr/bin/modernizr',
        outputFile: '<%= path.dest %>/scripts/modernizr.js',
        files: {
          src: [
            '<%= path.dest %>/scripts/{,*/}*.js',
            '<%= path.dest %>/styles/{,*/}*.css',
            '!<%= path.dest %>/scripts/modernizr.js'
          ]
        },
        uglify: true
      }
    },

    rsync: {
      options: {
        args: ['--verbose', '-a'],
        exclude: ['.git*','*.scss','node_modules'],
        recursive: true
      },
      fromstage: {
        options: {
          // Sync assets from the staging site to local version:
          src:  '<%= path.stage %>/assets/',
          dest: '<%= path.dest %>/assets/',
          delete: false // Careful this option could cause data loss!
        }
      },
      tostage: {
        options: {
          // Sync assets from local version to staging site:
          src:  '<%= path.dest %>/assets/',
          dest: '<%= path.stage %>/assets/',
          delete: false // Careful this option could cause data loss!
        }
      }
    }

  });

};
