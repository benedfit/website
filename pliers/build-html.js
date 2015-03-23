module.exports = task

var path = require('path')
  , join = path.join
  , async = require('async')
  , mkdir = require('mkdirp')
  , fs = require('fs-extra')
  , merge = require('lodash.merge')
  , frontmatter = require('front-matter')
  , jade = require('jade')
  , namp = require('namp')
  , moment = require('moment')
  , minify = require('html-minifier').minify

function task(pliers, config) {

  pliers('buildHtml', function (done) {

    var options = { pretty: false, time: moment.utc() }
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
            parseExcerpt(page, properties.body)
            page.parsed = true
          } else {
            page.contents = properties.body
          }

          page.path = setDestination(dest, page)
          page.url = page.path.replace(join(__dirname, '..', config.dest), '').replace('index.html', '')

          if (page.date) page.date = moment.utc(page.date)

          if (page.layout) {
            parseLayout(page)
          }

          pages.push(page)
        } else {
          mkdir(path.dirname(dest), function () {
            fs.copy(file, dest)
          })
        }

        callback()
      })

    }, function (err) {
      if (err) throw(err)

      posts.sort(function (a, b) {
        a = a.date
        b = b.date
        return a > b ? -1 : a < b ? 1 : 0
      })

      pages.sort(function (a, b) {
        a = a.url
        b = b.url
        return a < b ? -1 : a > b ? 1 : 0
      })

      options.posts = posts
      options.pages = pages

      async.each(pages, function (page) {
        var dest = page.path
          , ext = path.extname(dest)
          , data

        mkdir(path.dirname(dest), function () {
          options.page = page

          if (page.layout) {
            if (!page.parsed) {
              options.contents = jade.render(page.contents, options)
            } else {
              options.contents = page.contents
            }

            data = jade.renderFile(page.layoutPath, options)
          } else {
            data = jade.render(page.contents, options)
          }

          if (ext !== '.xml') data = minify(data, { collapseWhitespace: ext !== '.txt' })

          fs.writeFile(dest, data)
        })
      })

      done()
    })

    function parseExcerpt(page, body) {
      if (page.excerpt) {
        page.excerpt = namp(page.excerpt).html
      } else {
        page.excerpt = namp(body.split('\n')[ 0 ]).html
      }
    }

    function parseLayout(page) {
      page.layoutPath = join(__dirname, '..', config.src, 'templates', page.layout + '.jade')

      var data = fs.readFileSync(page.layoutPath, 'utf8')
        , properties

      if (frontmatter.test(data)) {
        properties = frontmatter(data)
        merge(page, properties.attributes)
      }

      if (page.layout === 'post') posts.push(page)
    }

    function setDestination(dest, page) {
      var permalink = page.permalink
        , ext = path.extname(dest)

      if (permalink) {
        if (permalink.match('/$')) {
          permalink = join(permalink, 'index.html')
        }

        dest = join(__dirname, '..', config.dest, permalink)
      }

      if (ext === '.md') {
        dest = dest.replace(ext, '.html')
      } else {
        dest = dest.replace('.jade', '')
      }

      return dest
    }

  })

}
