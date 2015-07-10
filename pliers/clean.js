module.exports = createTask

function createTask(pliers, config) {

  pliers('clean', function (done) {

    // ./build-css.js
    pliers.rm(__dirname + '/../' + config.src + '/_css')

    // ./build-html.js
    pliers.rm(__dirname + '/../' + config.dest)

    done()

  })

}
