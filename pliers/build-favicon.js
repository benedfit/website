module.exports = createTask

const anyNewerFiles = require('any-newer-files')
const fs = require('fs')
const glob = require('glob')
const { join } = require('path')
const pliersImagemin = require('pliers-imagemin')
const rfg = require('rfg-api').init()

function createTask(pliers, config) {
  const apiKey = 'b369276b27fde847136ab1453e5953e125d6d0b6'

  pliers('buildFavicon', function (done) {
    const src = join(__dirname, '/../', config.src)
    const dest = src + '/img'
    const sourceFile = dest + '/_favicon.png'
    const dataFile = src + '/_favicon.json'

    if (!anyNewerFiles([sourceFile], [dataFile])) {
      pliers.logger.warn('No Favicon changes found. No recompile required.')
      return done()
    }

    const request = rfg.createRequest({
      apiKey,
      masterPicture: sourceFile,
      iconsPath: '/img/',
      design: {
        ios: { pictureAspect: 'noChange' },
        desktopBrowser: {},
        windows: {
          pictureAspect: 'noChange',
          backgroundColor: config.metaTileColor,
          onConflict: 'override'
        },
        androidChrome: {
          pictureAspect: 'noChange',
          themeColor: config.metaTileColor,
          manifest: {
            name: config.title,
            display: 'browser',
            orientation: 'notSet',
            onConflict: 'override',
            declared: true
          }
        },
        safariPinnedTab: {
          pictureAspect: 'blackAndWhite',
          threshold: 50,
          themeColor: config.metaTileColor
        }
      },
      settings: { scalingAlgorithm: 'Mitchell', errorOnImageTooSmall: false }
    })

    rfg.generateFavicon(request, src, function (err, data) {
      if (err) return done(err)

      const images = glob.sync(src + '/*.{png,svg}')

      fs.writeFileSync(dataFile, JSON.stringify(data))

      pliersImagemin(
        pliers,
        images
      )(function (err) {
        if (err) return done(err)

        images.forEach(function (file) {
          fs.renameSync(file, file.replace(src, dest))
        })

        done()
      })
    })
  })
}
