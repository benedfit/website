module.exports = {
  options: {
    logConcurrentOutput: true
  },
  build: ['newer:stylus', 'newer:browserify', 'newer:imagemin'],
  watch: ['watch', 'connect']
}