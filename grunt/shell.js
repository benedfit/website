module.exports = {
	compass: {
		options: {
			stdout: true
		},
		command: 'bundle exec compass compile -e production --force --debug-info'
	},
	jekyll: {
		options: {
			stdout: true
		},
		command: 'bundle exec jekyll build --trace'
	},
	jekyll_dev: {
		options: {
			stdout: true
		},
		command: 'bundle exec jekyll build --config _config.yml,_config-dev.yml --trace'
	}
};
