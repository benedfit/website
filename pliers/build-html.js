module.exports = task

var path = require('path')
  , join = path.join
  , async = require('async')
  , mkdir = require('mkdirp')
  , fs = require('fs')
  , merge = require('lodash.merge')
  , frontmatter = require('front-matter')
  , jade = require('jade')

function task(pliers, config) {

  pliers('buildHtml', function (done) {

    async.each(pliers.filesets.contents, function (file) {
      var dest = file.replace(config.src, config.dest)
        , ext = path.extname(file)
        , properties
        , options =
        { pretty: false
        , cache: true
        }

      mkdir(path.dirname(dest))

      fs.readFile(file, 'utf8', function (err, data) {
        if (err) {
          pliers.logger.error('Failed to render contents')
          pliers.logger.error(err.stack)
        }

        if (frontmatter.test(data)) {
          properties = frontmatter(data)

          merge(options, config)
          merge(options, properties.attributes)

          if (properties.attributes.layout) {
            file = join(__dirname, '..', config.src, '_layouts', properties.attributes.layout + '.jade')
          }

          switch(ext) {
            case '.md':
              dest = dest.replace(ext, '.html')
              break
            case '.jade':
              dest = dest.replace(ext, '.html')
              break
          }

          options.contents = properties.body

          data = jade.renderFile(file, options)

        }

        fs.writeFile(dest, data)
        done()
      })

    })

  })

}