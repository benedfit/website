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

    console.log(pliers.filesets.contents.length)

    async.each(pliers.filesets.contents, function (file) {
      var dest = file.replace(config.src, config.dest)
        , ext = path.extname(file)
        , properties
        , options =
        { pretty: false
        , filename: file
        , cache: true
        }

      mkdir(path.dirname(dest))

      console.log(file)

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
            options.contents = properties.body
            data = jade.renderFile(file, options)
          } else {
            data = jade.render(properties.body, options)
          }

          switch(ext) {
            case '.md':
              dest = dest.replace(ext, '.html')
              break
            case '.jade':
              dest = dest.replace(ext, '.html')
              break
          }
        }

        fs.writeFile(dest, data)
        done()
      })

    })

  })

}