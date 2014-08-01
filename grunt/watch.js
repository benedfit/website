module.exports = {
  options: {
    livereload: true
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