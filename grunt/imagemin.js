module.exports = {
  all: {
    options: {
      optimizationLevel: 7
    },
    files: [{
      expand: true,
      cwd: 'jekyll/_assets/img',
      src: ['**/*.{gif,jpg,jpeg,png,svg}'],
      dest: 'jekyll/_assets/img'
    }]
  }
}