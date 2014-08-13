module.exports = {
  default: ['build', 'concurrent:watch'],
  build: ['force:on', 'concurrent:build', 'force:off', 'jade', 'jekyll']
}