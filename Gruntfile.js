'use strict';

module.exports = function(grunt) {

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

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
  * - Minifies CSS to main.min.css
  * - Concats JS to main.js
  * - Minifies JS to main.min.js
  * - Optimises images
  * - Creates custom Modernizr build
  */
  grunt.registerTask('default', [
    'sass',
    'autoprefixer',
    'concat',
    'cssmin',
    'uglify',
    'imagemin',
    'svgmin',
    'modernizr'
  ]);

  /*
  * $ grunt watch
  * - Watches SASS for changes --> render to CSS, autoprefixes + minify
  * - Watches JS for changes --> concat + minify
  * – Watch images and SVGs --> optimises and copies to public dir
  */

  // Set up tasks:
  grunt.initConfig({

    path: path,

    pkg: grunt.file.readJSON('package.json'),

    // Watch tasks:
    watch: {
      gruntfile: {
        files: ['Gruntfile.js']
      },
      css: {
        files: ['<%= path.src %>/styles/**/*.scss'],
        tasks: ['sass', 'autoprefixer', 'cssmin']
      },
      scripts: {
        files: ['<%= path.src %>/scripts/*.js'],
        tasks: ['jshint', 'concat', 'uglify']
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

    // Concatenate multiple source JS files into main.js/vendor.js
    concat: {
      dist: {
        files: {
          '<%= path.dest %>/scripts/main.js': [
            '<%= path.src %>/scripts/main.js'
          ],
          '<%= path.dest %>/scripts/vendor.js': [
            '<%= path.bower %>/jquery/dist/jquery.js'
          ]
        }
      }
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

    // Minify JS
    // (main.js --> main.min.js)
    // (vendor.js --> vendor.min.js)
    uglify: {
      dist: {
        files: {
          '<%= path.dest %>/scripts/main.min.js': [
            '<%= path.dest %>/scripts/main.js'
          ],
          '<%= path.dest %>/scripts/vendor.min.js': [
            '<%= path.dest %>/scripts/vendor.js'
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
        devFile: '<%= path.bower %>/modernizr/modernizr.js',
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
        args: ["--verbose", "-a"],
        exclude: [".git*","*.scss","node_modules"],
        recursive: true
      },
      fromstage: {
        options: {
          // Sync assets from the staging site to local version:
          src:  "<%= path.stage %>/assets/",
          dest: "<%= path.dest %>/assets/",
          delete: false // Careful this option could cause data loss!
        }
      },
      tostage: {
        options: {
          // Sync assets from local version to staging site:
          src:  "<%= path.dest %>/assets/",
          dest: "<%= path.stage %>/assets/",
          delete: false // Careful this option could cause data loss!
        }
      }
    }

  });

};
