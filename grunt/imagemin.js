module.exports = {
	all: {
		files: [{
			expand: true,
			cwd: '_deploy',
			src: ['**/*.{gif,jpg,png}'],
			dest: '_deploy'
		}]
	}
};