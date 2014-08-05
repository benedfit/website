module.exports = {
  all: {
    options: {
      compress: false,
      linenos: true,
      urlfunc: {
        name: 'embedurl',
        paths: ['jekyll/_assets/img']
      },
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