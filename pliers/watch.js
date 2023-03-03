module.exports = createTask

const browserSync = require('browser-sync')

function createTask(pliers, config) {
  pliers('watch', function () {
    pliers.watch(pliers.filesets.images, function () {
      pliers.run('imagemin', function () {
        browserSync.get(config.title).reload(pliers.filesets.pages)
      })
    })

    pliers.watch(pliers.filesets.stylus, function () {
      pliers.run('buildCss', function () {
        browserSync.get(config.title).reload(pliers.filesets.pages)
      })
    })

    pliers.watch(pliers.filesets.src, function () {
      pliers.run('buildHtml', function () {
        browserSync.get(config.title).reload(pliers.filesets.pages)
      })
    })
  })
}
