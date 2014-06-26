try {
	var ngrok = require('ngrok');
}
catch(e) {
}

module.exports = function(grunt) {
	'use strict';
	require('load-grunt-config')(grunt);
	require('load-grunt-tasks')(grunt);

	grunt.registerTask('insights', 'Run pagespeed with ngrok', function() {
		var done = this.async();
    	var port = 80;

    	ngrok.connect(port, function(err, url) {
        if (err !== null) {
          grunt.fail.fatal(err);
	       	return done();
        }

    		grunt.config.set('pagespeed.options.url', url);
    		grunt.task.run('pagespeed');
    		done();
		});
	});
};