module.exports = {
	all: {
		options: {
			config: ['_config.yml','_config-dev.yml'],
			drafts: true,
			force: true
		}
	},
  serve: {
    options: {
      config: ['_config.yml','_config-dev.yml'],
      drafts: true,
      serve: true,
      force: true
    }
  }
};
