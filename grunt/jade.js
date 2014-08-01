module.exports = {
  all: {
    options: {
      pretty: true
    },
    files: [{
      expand: true,
      cwd: 'jade',
      src: ['**/*.jade'],
      dest: 'jekyll',
      ext: '.html'
    }]
  }
}