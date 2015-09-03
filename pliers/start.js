module.exports = createTask

var browserSync = require('browser-sync')
  , openBrowser = false

function createTask(pliers, config) {

  if (process.argv.indexOf('-o') !== -1 || process.argv.indexOf('--open') !== -1) {
    openBrowser = true
  }

  var browserSyncConfig = {
      server: {
        baseDir: config.dest
      }
      , open: openBrowser
    }

  pliers('start', function (done) {

    browserSync.create(config.title).init(browserSyncConfig)

    done()

  })

}
