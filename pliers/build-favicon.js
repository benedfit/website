module.exports = createTask

const anyNewerFiles = require('any-newer-files')
const fs = require('fs')
const { globSync } = require('glob')
const { join } = require('path')
const pliersImagemin = require('pliers-imagemin')
const {
  generateFaviconFiles,
  generateFaviconHtml
} = require('@realfavicongenerator/generate-favicon')
const {
  getNodeImageAdapter,
  loadAndConvertToSvg
} = require('@realfavicongenerator/image-adapter-node')

function createTask(pliers, config) {
  pliers('buildFavicon', async function (done) {
    const src = join(__dirname, '/../', config.src)
    const dest = src + '/img'
    const sourceFile = dest + '/_favicon.png'
    const dataFile = src + '/_favicon.html'

    if (!anyNewerFiles([sourceFile], [dataFile])) {
      pliers.logger.warn('No Favicon changes found. No recompile required.')
      return done()
    }

    const masterIcon = { icon: await loadAndConvertToSvg(sourceFile) }
    const imageAdapter = await getNodeImageAdapter()
    const transformation = { type: 'none' }
    const settings = {
      icon: {
        desktop: {
          regularIconTransformation: transformation,
          darkIconType: 'none'
        },
        touch: { transformation, appTitle: config.title },
        webAppManifest: {
          transformation,
          backgroundColor: config.metaTileColor,
          themeColor: config.metaTileColor,
          name: config.title,
          shortName: config.title
        }
      },
      path: '/img/'
    }
    const icons = await generateFaviconFiles(masterIcon, settings, imageAdapter)
    const { markups } = generateFaviconHtml(settings)

    fs.writeFileSync(dataFile, markups.join('\n'))

    Object.entries(icons).forEach(([file, data]) => {
      fs.writeFileSync(join(src, file), data)
    })

    const images = globSync(src + '/*.{png,svg}')

    pliersImagemin(
      pliers,
      images
    )(err => {
      if (err) return done(err)

      images.forEach(file => fs.renameSync(file, file.replace(src, dest)))

      done()
    })
  })
}
