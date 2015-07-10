module.exports = tasks

var glob = require('glob')
  , createConfigury = require('configury')
  , configury = createConfigury('./config.json')
  , config = configury(process.env.NODE_ENV)
  , browserSync = require('browser-sync')
  , openBrowser = false

function tasks(pliers) {

  // Load pliers plugins
  glob.sync(__dirname + '/pliers/*.js').forEach(function (file) {
    require(file)(pliers, config)
  })

  // Load filesets
  glob.sync(__dirname + '/pliers/filesets/*.js').forEach(function (file) {
    require(file)(pliers, config)
  })

  // Start BrowserSync server
  pliers('start', function (done) {
    var browserSyncConfig = {
      server: {
        baseDir: config.dest
      }
      , open: openBrowser
    }

    browserSync(browserSyncConfig)
    done()
  })

  pliers('watch', function () {

    pliers.watch(pliers.filesets.images, function() {
      pliers.run('imagemin', function () {
        browserSync.reload(pliers.filesets.pages)
      })
    })

    pliers.watch(pliers.filesets.stylus, function () {
      pliers.run('buildCss', function () {
        browserSync.reload(pliers.filesets.pages)
      })
    })

    pliers.watch(pliers.filesets.src, function () {
      pliers.run('buildHtml', function () {
        browserSync.reload(pliers.filesets.pages)
      })
    })

  })

  pliers('go', function () {

    if (process.argv.indexOf('-o') !== -1 || process.argv.indexOf('--open') !== -1) {
      openBrowser = true
    }

    pliers('run', 'build', 'start', 'watch')
    pliers.run('run')

  })

}
