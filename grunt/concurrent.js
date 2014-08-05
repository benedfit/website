module.exports = {
  options: {
    logConcurrentOutput: true
  },
  build: ['stylus', 'browserify'],
  watch: ['watch', 'connect']
}