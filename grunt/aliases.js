module.exports = {
	default: ['watch'],
	deploy_dev: ['shell:compass', 'shell:jekyll_dev'],
	deploy_master: ['shell:compass', 'shell:jekyll', 'concurrent:minify'],
	lint: ['newer:jshint']
};