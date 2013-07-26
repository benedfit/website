module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		compass: {
			options: {
				config: 'config.rb',
				force: true
			},
			dev: {
				options: {
					environment: 'development'
				}
			},
			deploy: {
				options: {
					debugInfo: true,
					environment: 'production',
				}
			}
		},
		imagemin: {
           	deploy: {
				options: {
					optimizationLevel: 7,
				},
				files: [{
	                expand: true,
	                cwd: 'source/',
	                src: ['**/*.jpg','**/*.png'],
	                dest: '_deploy'
	            }]
			}
		},
		jekyll: {
			options: {
				force: true
			},
			dev: {
				options: {
					config: '_config.yml',
				}
			},
			deploy: {
				options: {
					config: '_config.yml,_config.deploy.yml',
					trace: true
				}
			}
		},
		watch: {
			images: {
				files: 'source/_img/**',
				tasks: ['imagemin:dev']
			},
			sass: {
				files: 'source/_sass/**',
				tasks: ['compass:dev']
			}
		}
	});
	
	grunt.loadNpmTasks('grunt-contrib-compass');
	grunt.loadNpmTasks('grunt-contrib-imagemin');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-jekyll');
	
	grunt.registerTask('default', ['compass:dev', 'jekyll:dev']);
	grunt.registerTask('deploy', ['jekyll:deploy', 'imagemin:deploy']);
};