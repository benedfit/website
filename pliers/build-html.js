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
  , moment = require('moment')

function task(pliers, config) {

  pliers('buildHtml', function (done) {

    var options = { pretty: false }
      , pages = []
      , posts = []

    merge(options, config)

    async.each(pliers.filesets.pages, function (file, callback) {
      var dest = file.replace(config.src, config.dest)
        , ext = path.extname(file)
        , properties
        , page = {}

      fs.readFile(file, 'utf8', function (err, data) {
        if (err) throw(err)

        if (frontmatter.test(data)) {
          properties = frontmatter(data)

          merge(page, properties.attributes)

          if (ext === '.md') {
            page.contents = namp(properties.body).html
            page.parsed = true
          } else {
            page.contents = properties.body
          }

          page.path = setDestination(dest, page)
          page.url = page.path.replace(join(__dirname, '..', config.dest), '').replace('index.html', '')

          if (page.date) page.date = moment.utc(page.date)

          if (page.layout === 'post') posts.push(page)

          pages.push(page)
        } else {
          mkdir(path.dirname(dest), function () {
            fs.writeFile(dest, data)
          })
        }

        callback()
      })

    }, function (err) {
      if (err) {
        pliers.logger.error('Failed to render contents')
        pliers.logger.error(err.stack)
      }

      posts.sort(function (a, b) {
        a = a.date
        b = b.date
        return a > b ? -1 : a < b ? 1 : 0
      })

      options.posts = posts
      options.pages = pages

      async.each(pages, function (page) {
        var dest = page.path
          , file
          , data

        mkdir(path.dirname(dest), function () {
          options.page = page

          if (page.layout) {
            file = join(__dirname, '..', config.src, 'views', page.layout + '.jade')

            if (!page.parsed) {
              options.contents = jade.render(page.contents, options)
            } else {
              options.contents = page.contents
            }

            data = jade.renderFile(file, options)
          } else {
            data = jade.render(page.contents, options)
          }

          fs.writeFile(dest, data)
        })
      })

      done()
    })

    function setDestination(dest, page) {
      var permalink = page.permalink
        , ext = path.extname(dest)

      if (permalink) {
        if (permalink.match('/$')) {
          permalink = join(permalink, 'index.html')
        }

        dest = join(__dirname, '..', config.dest, permalink)
      }

      if (ext === '.md' || ext === '.jade') {
        dest = dest.replace(ext, '.html')
      } else {
        dest = dest.replace('.jade', '')
      }

      return dest
    }

  })

}
