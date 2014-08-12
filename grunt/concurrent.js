module.exports = {
  options: {
    logConcurrentOutput: true
  },
  build: ['stylus', 'browserify', 'imagemin'],
  watch: ['watch', 'connect']
}