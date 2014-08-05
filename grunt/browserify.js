module.exports = {
  all: {
    files: [{
      expand: true,
      cwd: 'browserify',
      src: ['**/*.js', '!**/_*.js'],
      dest: 'jekyll/_assets/js'
    }]
  }
}