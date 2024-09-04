module.exports = createTask

const { dirname, extname, join } = require('path')
const async = require('async')
const { mkdirp } = require('mkdirp')
const fs = require('fs-extra')
const merge = require('lodash.merge')
const frontmatter = require('front-matter')
const pug = require('pug')
const namp = require('namp')
const moment = require('moment')
const minify = require('html-minifier').minify
const { highlight } = require('highlight.js')

function createTask(pliers, config) {
  pliers('buildHtml', function (done) {
    const options = { pretty: false, time: moment.utc() }
    const pages = []
    const posts = []
    let archive
    const archives = []

    merge(options, config)

    async.each(
      pliers.filesets.pages,
      function (file, callback) {
        const dest = file.replace(config.src, config.dest)
        const ext = extname(file)
        let properties
        const page = {}

        fs.readFile(file, 'utf8', function (err, data) {
          if (err) throw err

          if (frontmatter.test(data)) {
            properties = frontmatter(data)

            merge(page, properties.attributes)

            if (ext === '.md') {
              page.contents = parseMarkdown(properties.body)
              parseExcerpt(page, properties.body)
              page.parsed = true
            } else {
              page.contents = properties.body
            }

            page.path = setDestination(dest, page)
            page.url = setUrl(page)

            if (page.date) page.date = moment.utc(page.date)

            if (page.layout) {
              parseLayout(page)
            }

            pages.push(page)
          } else {
            mkdirp.sync(dirname(dest))
            fs.copy(file, dest)
          }

          callback()
        })
      },
      function (err) {
        if (err) throw err

        posts.sort(function (a, b) {
          a = a.date
          b = b.date
          return a > b ? -1 : a < b ? 1 : 0
        })

        if (archive !== null) {
          async.each(posts, function (post) {
            createArchive(post.date)
            createArchive(post.date, true)
          })
        }

        pages.sort(function (a, b) {
          a = a.url
          b = b.url
          return a < b ? -1 : a > b ? 1 : 0
        })

        options.posts = posts
        options.pages = pages

        async.each(pages, function (page) {
          const dest = page.path
          const ext = extname(dest)
          let data

          mkdirp.sync(dirname(dest))

          options.page = page

          if (page.layout) {
            if (!page.parsed) {
              options.contents = pug.render(page.contents, options)
            } else {
              options.contents = page.contents
            }

            data = pug.renderFile(page.layoutPath, options)
          } else {
            data = pug.render(page.contents, options)
          }

          if (ext !== '.xml')
            data = minify(data, { collapseWhitespace: ext !== '.txt' })

          fs.writeFile(dest, data)
        })

        done()
      }
    )

    function createArchive(date, isMonth) {
      const page = JSON.parse(JSON.stringify(archive))
      const year = date.format('YYYY')
      const month = date.format('MM')
      const monthName = date.format('MMMM')

      page.postsYear = year
      page.permalink = '/' + year + '/'
      page.title = date.format(page.titleYear)
      page.metaDescription = date.format(page.metaDescriptionYear)

      if (isMonth) {
        page.postsMonth = month
        page.postsMonthName = monthName
        page.permalink = page.permalink + ('0' + month).slice(-2) + '/'
        page.title = date.format(page.titleMonth)
        page.metaDescription = date.format(page.metaDescriptionMonth)
      }

      page.path = setDestination(page.path, page)
      page.url = setUrl(page)

      if (archives.indexOf(page.permalink) === -1) {
        archives.push(page.permalink)
        pages.push(page)
      }
    }

    function parseMarkdown(markdown) {
      return namp(markdown, {
        highlight: (code, language) => highlight(code, { language }).value
      }).html
    }

    function parseExcerpt(page, body) {
      if (page.excerpt) {
        page.excerpt = parseMarkdown(page.excerpt)
      } else {
        page.excerpt = parseMarkdown(body.split('\n')[0])
      }
    }

    function parseLayout(page) {
      page.layoutPath = join(
        __dirname,
        '..',
        config.src,
        'views',
        page.layout + '.pug'
      )

      const data = fs.readFileSync(page.layoutPath, 'utf8')
      let properties

      if (frontmatter.test(data)) {
        properties = frontmatter(data)
        merge(page, properties.attributes)
      }

      if (page.layout === 'post') posts.push(page)
      if (page.layout === 'archive' && page.isarchive) archive = page
    }

    function setDestination(dest, page) {
      let permalink = page.permalink
      const ext = extname(dest)

      if (permalink) {
        if (permalink.match('/$')) {
          permalink = join(permalink, 'index.html')
        }

        dest = join(__dirname, '..', config.dest, permalink)
      }

      if (ext === '.md') {
        dest = dest.replace(ext, '.html')
      } else {
        dest = dest.replace('.pug', '')
      }

      return dest
    }

    function setUrl(page) {
      return page.path
        .replace(join(__dirname, '..', config.dest), '')
        .replace('index.html', '')
    }
  })
}
