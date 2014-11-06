module.exports = task

var path = require('path')
  , join = path.join
  , async = require('async')
  , mkdir = require('mkdirp')
  , stylus = require('stylus')
  , renderStylus = require('stylus-renderer')
  , autoprefixer = require('autoprefixer-stylus')
  , stylusMixins = require('stylus-mixins')
  , cleancss = require('./lib/clean-css')
  , middleware = [ autoprefixer(), stylusMixins() ]
  , env = process.env.NODE_ENV || 'development'
  , debug = env === 'development'

if (!debug) {
  middleware.push(cleancss())
}

function task(pliers, config) {

  pliers('buildCss', function (done) {

    async.each(pliers.filesets.stylesheets, function (file) {
      var src = path.dirname(file)
        , dest = src.replace(config.src, config.dest)

      mkdir(dest)

      renderStylus(file
        , { src: src
          , dest: dest
          , use: middleware
          , stylusOptions: { compress: false }
          , define:
            { $ENV: env
            , embedurl: stylus.url(
              { limit: false
              , paths: [ join(__dirname, '..', config.src) ]
              })
            }
          }
          , function (err) {
            if (err) {
              pliers.logger.error('Failed to render stylus')
              pliers.logger.error(err.stack)
            }
            done()
          }).on('log', function (msg, level) { pliers.logger[level](msg) })
    })

  })

}
