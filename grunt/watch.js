module.exports = {
  options: {
    livereload: true
  },
  browserify: {
    files: ['browserify/**'],
    tasks: ['newer:jshint', 'newer:browserify']
  },
  jekyll: {
    files: ['jekyll/**'],
    tasks: ['jekyll']
  },
  jade: {
    files: ['jade/**'],
    tasks: ['newer:jade']
  },
  stylus: {
    files: ['stylus/**'],
    tasks: ['newer:stylus']
  }
}