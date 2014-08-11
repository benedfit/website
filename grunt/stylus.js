module.exports = {
  all: {
    options: {
      compress: false,
      linenos: true,
      urlfunc: {
        name: 'embedurl',
        paths: ['jekyll/_assets/img', 'jekyll/_assets/fonts']
      },
      use: [require('autoprefixer-stylus'), require('stylus-mixins')]
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