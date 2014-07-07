module.exports = function(grunt) {

	// Source and destination paths for tasks:
	var path = {
		src:	'app/src',
		dest:	'app/public',
		bower:	'app/public/bower_components'
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
		'concat:scripts',
		'cssmin',
		'uglify',
		'imagemin',
		'svgmin'
	]);

	/*
	* $ grunt watch
	* - Watches SASS for changes --> render to CSS + minify
	* - Watches JS for changes --> concat + minify
	*/

	// Set up tasks:
	grunt.initConfig({

		path: path,

		pkg: grunt.file.readJSON('package.json'),

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

		// Concatenate multiple source JS files into main.js:
		concat: {
			scripts: {
				src: ['<%= path.src %>/js/*.js'],
				dest: '<%= path.dest %>/js/main.js'
			}
		},

		// Minify CSS (main.css --> main.min.css):
		cssmin: {
			css: {
				files: {
					'<%= path.dest %>/css/main.min.css': ['<%= path.dest %>/css/main.css']
				}
			}
		},

		// Minify JS (main.js --> main.min.js):
		uglify: {
			scripts: {
				files: {
					'<%= path.dest %>/js/main.min.js': ['<%= path.dest %>/js/main.js']
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

		// Watch tasks:
		watch: {
			css: {
				files: ['<%= path.src %>/css/**/*.scss'],
				tasks: ['sass', 'cssmin']
			},
			scripts: {
				files: ['<%= path.src %>/js/*.js'],
				tasks: ['concat:scripts', 'uglify']
			},
			images: {
				files: ['<%= path.src %>/img/**/*.{png,jpg,gif}'],
				tasks: ['newer:imagemin']
			},
			svg: {
				files: ['<%= path.src %>/img/**/*.svg'],
				tasks: ['newer:svgmin']
			}
		}
	});

	// Let's use the 'load-grunt-tasks' task to handle loading all the tasks:
	require('load-grunt-tasks')(grunt);
};