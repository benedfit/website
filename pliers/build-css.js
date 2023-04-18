module.exports = createTask

const { dirname, join } = require('path')
const async = require('async')
const { mkdirp } = require('mkdirp')
const stylus = require('stylus')
const renderStylus = require('stylus-renderer')
const autoprefixer = require('autoprefixer-stylus')
const stylusMixins = require('stylus-mixins')
const cleancss = require('./lib/clean-css')
const middleware = [autoprefixer(), stylusMixins(), cleancss()]
const env = process.env.NODE_ENV || 'development'

function createTask(pliers, config) {
  pliers('buildCss', function (done) {
    async.each(pliers.filesets.stylesheets, function (file) {
      const src = dirname(file)
      const dest = src.replace('stylus', '_css')

      mkdirp.sync(dest)

      renderStylus(
        file,
        {
          src,
          dest,
          use: middleware,
          stylusOptions: { compress: false },
          define: {
            $ENV: env,
            embedurl: stylus.url({
              limit: false,
              paths: [join(__dirname, '..', config.src)]
            })
          }
        },
        function (err) {
          if (err) throw err
          done()
        }
      ).on('log', function (msg, level) {
        pliers.logger[level](msg)
      })
    })
  })
}
