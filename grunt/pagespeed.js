module.exports = {
	options: {
		nokey: true,
		locale: 'en_GB',
        threshold: 80,
        paths: [
        	'/'/*,
        	'/404.html',
        	'/2013/',
        	'/2013/06/',
        	'/2013/06/atomic-design-phases-and-mesophases/',
        	'/2013/06/phases-and-atomic-design-phase-one/',
        	'/2013/11/',
        	'/2013/11/pattern-library-annotations-documentation-and-more/',
        	'/archive/',
        	'/styleguide/'*/
        ]
	},
	mobile: {
    	options: {
      		strategy: 'mobile'
    	}
  	},
    desktop: {
		options: {
  			strategy: 'desktop'
    	}
  	}
};