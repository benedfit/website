module.exports = {
  default: ['build', 'concurrent:watch'],
  build: ['concurrent:build', 'newer:jade', 'jekyll'],
}