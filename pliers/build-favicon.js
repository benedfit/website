module.exports = createTask

var anyNewerFiles = require('any-newer-files')
  , fs = require('fs')
  , glob = require('glob')
  , path = require('path')
  , pliersImagemin = require('pliers-imagemin')
  , rfg = require('rfg-api').init()

function createTask (pliers, config) {

  var apiKey = 'b369276b27fde847136ab1453e5953e125d6d0b6'

  pliers('buildFavicon', function (done) {

    var src = path.resolve(__dirname + '/../' + config.src)
      , dest = src + '/img'
      , sourceFile = dest + '/_favicon.png'
      , dataFile = src + '/_favicon.json'
      , request

    if (!anyNewerFiles([ sourceFile ], [ dataFile ])) {
      pliers.logger.warn('No Favicon changes found. No recompile required.')
      return done()
    }

    request = rfg.createRequest(
      { apiKey: apiKey
      , masterPicture: sourceFile
      , iconsPath: '/img/'
      , design:
        { ios: { pictureAspect: 'noChange' }
        , desktopBrowser: {}
        , windows:
          { pictureAspect: 'noChange'
          , backgroundColor: config.metaTileColor
          , onConflict: 'override'
          }
        , androidChrome:
          { pictureAspect: 'noChange'
          , themeColor: config.metaTileColor
          , manifest:
            { name: config.title
            , display: 'browser'
            , orientation: 'notSet'
            , onConflict: 'override'
            , declared: true
            }
          }
        , safariPinnedTab:
          { pictureAspect: 'blackAndWhite'
          , threshold: 50
          , themeColor: config.metaTileColor
          }
        }
      , settings:
        { 'scalingAlgorithm': 'Mitchell'
        , 'errorOnImageTooSmall': false
        }
      }
    )

    rfg.generateFavicon(request, src, function (err, data) {
      if (err) return done(err)

      var images = glob.sync(src + '/*.{png,svg}')

      fs.writeFileSync(dataFile, JSON.stringify(data))

      pliersImagemin(pliers, images)(function (err) {
        if (err) return done(err)

        images.forEach(function (file) {
          fs.renameSync(file, file.replace(src, dest))
        })

        done()
      })

    })

  })

}
