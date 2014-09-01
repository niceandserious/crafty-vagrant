'use strict';

module.exports = function(grunt) {

	// Time how long tasks take. Can help when optimizing build times
	require('time-grunt')(grunt);

	// Load grunt tasks automatically
	require('load-grunt-tasks')(grunt);

	// Source and destination paths for tasks:
	var path = {
		src:	'app/src',
		dest:	'app/public',
		bower:	'bower_components'
	}

	/*
	* $ grunt
	* - Compiles SASS
	* - Minifies CSS to main.min.css
	* - Concats JS to main.js
	* - Minifies JS to main.min.js
	* - Optimises images
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
			css: {
				files: ['<%= path.src %>/css/**/*.scss'],
				tasks: ['sass', 'autoprefixer', 'cssmin']
			},
			scripts: {
				files: ['<%= path.src %>/js/*.js'],
				tasks: ['concat', 'uglify']
			},
			images: {
				files: ['<%= path.src %>/img/**/*.{png,jpg,gif}'],
				tasks: ['newer:imagemin']
			},
			svg: {
				files: ['<%= path.src %>/img/**/*.svg'],
				tasks: ['newer:svgmin']
			}
		},

		// SASS config:
		sass: {
			dist: {
				options: {
					// Allow easy importing of bourbon and neat (via eg. @import "bourbon"):
					loadPath: [
						'<%= path.bower %>/bourbon/dist',
						'<%= path.bower %>/neat/app/assets/stylesheets',
						'<%= path.bower %>/normalize-scss'
					]
				},
				files: {
					'<%= path.dest %>/css/main.css': '<%= path.src %>/css/main.scss'
				}
			}
		},

		// Add vendor prefixed styles
		autoprefixer: {
			options: {
				browsers: ['last 1 version']
			},
			dist: {
				files: [{
					expand: true,
					cwd: '<%= path.dest %>/css',
					src: '{,*/}*.css',
					dest: '<%= path.dest %>/css'
				}]
			}
		},

		// Concatenate multiple source JS files into main.js/vendor.js
		concat: {
			dist: {
				files: {
					'<%= path.dest %>/js/main.js': [
						'<%= path.src %>/js/main.js'
					], 
					'<%= path.dest %>/js/vendor.js': [
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
					'<%= path.dest %>/css/main.min.css': [
						'<%= path.dest %>/css/main.css'
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
					'<%= path.dest %>/js/main.min.js': [
						'<%= path.dest %>/js/main.js'
					],
					'<%= path.dest %>/js/vendor.min.js': [
						'<%= path.dest %>/js/vendor.js'
					]
				}
			}
		},

		// Optimise images:
		imagemin: {
			all: {
				files: [{
					expand: true,
					cwd: '<%= path.src %>/img',
					src: ['**/*.{png,jpg,gif}'],
					dest: '<%= path.dest %>/img'
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
					cwd: '<%= path.src %>/img',
					src: '{,*/}*.svg',
					dest: '<%= path.dest %>/img'
				}]
			}
		},

		// Generates a custom Modernizr build that includes only the tests you
		// reference in your app
		modernizr: {
			dist: {
				devFile: '<%= path.bower %>/modernizr/modernizr.js',
				outputFile: '<%= path.dest %>/js/modernizr.js',
				files: {
					src: [
						'<%= path.dest %>/js/{,*/}*.js',
						'<%= path.dest %>/css/{,*/}*.css',
						'!<%= path.dest %>/js/modernizr.js'
					]
				},
				uglify: true
			}
		}

	});

};