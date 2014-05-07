module.exports = function(grunt) {

	/*
	* $ grunt
	* - Compiles SASS
	* - Minifies CSS to main.min.css
	* - Concats JS to main.js
	* - Minifies JS to main.min.js
	* - Optimises images
	*/
	grunt.registerTask('default', ['sass', 'concat:scripts', 'cssmin', 'uglify', 'imagemin']);

	/*
	* $ grunt watch
	* - Watches SASS for changes --> render to CSS + minify
	* - Watches JS for changes --> concat + minify
	*/

	// Set up tasks:
	grunt.initConfig({
		pkg : grunt.file.readJSON('package.json'),

		// SASS config:
		sass: {
			dist: {
				options: {
					// Allow easy importing of bourbon and neat (via eg. @import "bourbon"):
					loadPath: [
						'bower_components/bourbon/app/assets/stylesheets',
						'bower_components/neat/app/assets/stylesheets'
					]
				},
				files: {
					'app/public/css/main.css': 'app/src/css/main.scss'
				}
			}
		},

		// Concatenate multiple source JS files into main.js:
		concat : {
			scripts : {
				src : ['app/src/js/*.js'],
				dest : 'app/public/js/main.js'
			}
		},

		// Minify CSS (main.css --> main.min.css):
		cssmin : {
			css : {
				files : {
					'app/public/css/main.min.css' : ['app/public/css/main.css']
				}
			}
		},

		// Minify JS (main.js --> main.min.js):
		uglify : {
			scripts : {
				files : {
					'app/public/js/main.min.js' : ['app/public/js/main.js']
				}
			}
		},

		// Optimise images:
		imagemin : {
			all : {
				files : [{
					expand : true,
					cwd: 'app/src/img',
					src: ['**/*.{png,jpg,gif}'],
					dest: 'app/public/img'
				}]
			}
		},

		// Watch tasks:
		watch : {
			css : {
				files : ['app/src/css/*.scss'],
				tasks : ['sass', 'cssmin'],
			},
			scripts : {
				files : ['app/src/js/*.js'],
				tasks : ['concat:scripts', 'uglify']
			},
			images: {
				files: ['app/src/img/**/*.{png,jpg,gif}'],
				tasks: ['newer:imagemin']
			}
		}
	});

	// Let's use the 'load-grunt-tasks' task to handle loading all the tasks:
	require('load-grunt-tasks')(grunt);
};