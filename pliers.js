module.exports = tasks

var path = require('path')
  , join = path.join
  , glob = require('glob')
  , rmdir = require('rimraf')
  , createConfigury = require('configury')
  , configury = createConfigury('./config.json')
  , config = configury(process.env.NODE_ENV)
  , browserSync = require('browser-sync')
  , src = join(__dirname, config.src)
  , dest = join(__dirname, config.dest)
  , hiddenGlob = join(src, '**/_*')
  , stylusGlob = join(src, '**/*.styl')
  , jadeGlob = join(src, 'views', '**/*.jade')

function tasks(pliers) {

  // Load pliers plugins
  glob.sync(__dirname + '/pliers/*.js').forEach(function (file) {
    require(file)(pliers, config)
  })

  // Define the filesets
  pliers.filesets('stylus', stylusGlob)
  pliers.filesets('stylesheets', pliers.filesets.stylus, hiddenGlob)
  pliers.filesets('jade', join(src, jadeGlob))
  pliers.filesets('src', join(src, '**/*.*'))
  pliers.filesets('pages', pliers.filesets.src, [ join(src, '_**/**'), hiddenGlob, stylusGlob, jadeGlob ])

  pliers('clean', function (done) {
    rmdir(dest, function () {
      rmdir(join(src, '_css'), done)
    })
  })

  pliers('start', function (done) {
    var browserSyncConfig = {
      server: {
        baseDir: config.dest
      }
    }

    browserSync(browserSyncConfig)
    done()
  })

  // Any building that is needed before running the application
  pliers('build', 'clean', 'buildCss', 'buildHtml')

  pliers('watch', function () {

    pliers.watch(pliers.filesets.src, function () {
      pliers.run('build', function () {
        browserSync.reload(pliers.filesets.src)
      })
    })

  })

  pliers('go', 'build', 'start', 'watch')

}
