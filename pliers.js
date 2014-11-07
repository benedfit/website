module.exports = tasks

var path = require('path')
  , join = path.join
  , notifier = require('node-notifier')
  , glob = require('glob')
  , rmdir = require('rimraf')
  , createConfigury = require('configury')
  , configury = createConfigury('./config.json')
  , config = configury(process.env.NODE_ENV)
  , src = join(__dirname, config.src)
  , dest = join(__dirname, config.dest)
  , hiddenGlob = join(src, '**/_*')
  , stylusGlob = join(src, '**/*.styl')
  , jadeGlob = join(src, 'views', '**/*.jade')

function tasks(pliers) {

  function notify(message, title) {
    title = title || config.projectName
    notifier.notify(
      { title: title
      , message: message
      })
    pliers.logger.info(message)
  }

  // Load pliers plugins
  glob.sync(__dirname + '/pliers/*.js').forEach(function (file) {
    require(file)(pliers, config)
  })

  // Define the filesets
  pliers.filesets('stylus', stylusGlob)
  pliers.filesets('stylesheets', pliers.filesets.stylus, hiddenGlob)
  pliers.filesets('jade', join(src, jadeGlob))
  pliers.filesets('contents', join(src, '**/*'), [ join(src, '_**/**'), hiddenGlob, stylusGlob, jadeGlob ])

  pliers('clean', function (done) {
    rmdir(dest, done)
  })

  // Any building that is needed before running the application
  pliers('build', 'clean', 'buildCss', 'buildHtml')

  pliers('watch', function () {

    pliers.watch(pliers.filesets.stylus, function () {
      pliers.run('buildCss', function () {
        if (notify) notify('CSS updated')
      })
    })

    pliers.watch(pliers.filesets.jade, function () {
      pliers.run('buildHtml', function () {
        if (notify) notify('HTML updated')
      })
    })

  })

  pliers('go', 'build', 'watch')

}
