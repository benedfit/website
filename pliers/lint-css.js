module.exports = task

function task(pliers, config) {

  pliers('lintCss', function (done) {
    var files = __dirname + '/../' + config.src + '/_css'

    if (typeof process.argv[3] !== 'undefined') {
      files += '/' + process.argv[3] + '.css'
    }

    pliers.exec(__dirname + '/../node_modules/csslint/cli.js ' + files, done)
  })

}
