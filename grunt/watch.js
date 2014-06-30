module.exports = {
	compass: {
		files: ['source/**/*.scss'],
		tasks: ['compass']
	},
	jshint: {
		files: ['source/**/*.js','!**/libs/*.js'],
		tasks: ['newer:jshint']
	},
	jekyll: {
		files: ['source/**','!**/*.scss'],
		tasks: ['jekyll']
	}
};