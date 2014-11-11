module.exports = task

var path = require('path')
  , join = path.join
  , async = require('async')
  , mkdir = require('mkdirp')
  , fs = require('fs')
  , merge = require('lodash.merge')
  , frontmatter = require('front-matter')
  , jade = require('jade')
  , namp = require('namp')

function task(pliers, config) {

  pliers('buildHtml', function (done) {

    async.each(pliers.filesets.pages, function (file) {
      var dest = file.replace(config.src, config.dest)
        , ext = path.extname(file)
        , isMarkdown = ext === '.md'
        , properties
        , options = { pretty: false }

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
            file = join(__dirname, '..', config.src, 'views', properties.attributes.layout + '.jade')

            if (isMarkdown) {
              options.contents = namp(properties.body).html
            } else {
              options.contents = properties.body
            }

            data = jade.renderFile(file, options)
          } else {
            data = jade.render(properties.body, options)
          }

          if (isMarkdown) {
            dest = dest.replace(ext, '.html')
          } else {
            dest = dest.replace('.jade', '')
          }
        }

        fs.writeFile(dest, data)
        done()
      })

    })

  })

}