module.exports = {
  options: {
    livereload: true
  },
  browserify: {
    files: ['browserify/**'],
    tasks: ['jshint', 'browserify']
  },
  jekyll: {
    files: ['jekyll/**'],
    tasks: ['jekyll']
  },
  jade: {
    files: ['jade/**'],
    tasks: ['jade']
  },
  stylus: {
    files: ['stylus/**'],
    tasks: ['stylus']
  }
}