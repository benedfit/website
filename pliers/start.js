module.exports = createTask

const browserSync = require('browser-sync')
let openBrowser = false

function createTask(pliers, config) {
  if (
    process.argv.indexOf('-o') !== -1 ||
    process.argv.indexOf('--open') !== -1
  ) {
    openBrowser = true
  }

  const browserSyncConfig = {
    server: { baseDir: config.dest },
    open: openBrowser
  }

  pliers('start', function (done) {
    browserSync.create(config.title).init(browserSyncConfig)

    done()
  })
}
