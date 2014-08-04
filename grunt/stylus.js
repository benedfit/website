module.exports = {
  all: {
    options: {
      compress: false,
      linenos: true,
      use: [require('autoprefixer-stylus')]
    },
    files: [{
      expand: true,
      cwd: 'stylus',
      src: ['**/*.styl', '!**/_*.styl'],
      dest: 'jekyll/_assets/css',
      ext: '.css'
    }]
  }
}