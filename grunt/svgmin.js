module.exports = {
  all: {
    files: [{
      expand: true,
      cwd: '_deploy/img',
      src: ['**/*.svg','!**/fonts/**/*.svg'],
      dest: '_deploy/img'
    }]
  }
};