module.exports = task

require('colors')

var Crawler = require('simplecrawler')
  , cheerio = require('cheerio')
  , errors = false

function task(pliers, config) {

  pliers('checkLinks', function (done) {
    var site = '7a727782.ngrok.com'//config.domain
      , crawler = new Crawler(site)

    crawler
      .on('fetch404', function(queueItem, response) {
        errors = true
        pliers.logger.error('Resource not found linked from ' + queueItem.referrer.cyan + ' to', queueItem.url.magenta)
        pliers.logger.error('Status code: ' + response.statusCode)
      })
      .on('fetchredirected', function(queueItem, response) {
        errors = true
        pliers.logger.error('Resource redirected from ' + queueItem.referrer.cyan + ' to', queueItem.url.magenta)
        pliers.logger.error('Status code: ' + response.statusCode)
      })
      .on('fetcherror', function(queueItem, response) {
        errors = true
        pliers.logger.error('Trouble fetching the following resource linked from ' + queueItem.referrer.cyan + ' to', queueItem.url.magenta)
        pliers.logger.error('Status code: ' + response.statusCode)
      })
      .on('fetchtimeout', function(queueItem) {
        errors = true
        pliers.logger.error('Timeout fetching the following resource linked from ' + queueItem.referrer.cyan + ' to', queueItem.url.magenta)
      })
      .on('fetchclienterror', function(queueItem) {
        errors = true
        if (!queueItem.referrer) {
          return pliers.logger.error('Error fetching `site` URL: ' + queueItem.url.magenta)
        }
        pliers.logger.error('Client error fetching the following resource linked from ' + queueItem.referrer ? queueItem.referrer.cyan : site + ' to', queueItem.url.magenta)
      })
      .on('complete', function() {
        if (!errors) {
          pliers.logger.info('No broken links found at: ' + site)
        }
        done(!errors)
      })
      .on('fetchcomplete', function(queueItem, responseBuffer) {
        pliers.logger.debug('Fetched: ' + queueItem.url)
        var html = responseBuffer.toString()
        var $ = cheerio.load(html)

        $('a[href*="#"]').each(function(i, anchor) {
          crawler.queueURL($(anchor).attr('href'), queueItem)
        })

        if (queueItem.url.indexOf('#') !== -1) {
          try {
            if ($(queueItem.url.slice(queueItem.url.indexOf('#'))).length === 0) {
              pliers.logger.error('Error finding content with the following fragment identifier linked from ' + queueItem.referrer.cyan  + ' to', queueItem.url.magenta)
              errors = true
            }
          } catch (e) {
            pliers.logger.error('The following URL was formatted incorrectly linked from ' + queueItem.referrer.cyan  + ' to', queueItem.url.magenta)
            errors = true
          }
        }
      })
    crawler.start()
    done()
  })

}
