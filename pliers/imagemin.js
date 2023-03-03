module.exports = createTask

const pliersImagemin = require('pliers-imagemin')

function createTask(pliers) {
  pliers('imagemin', function (done) {
    pliersImagemin(
      pliers,
      pliers.filesets.images
    )(function (err) {
      if (err) return done(err)
      done()
    })
  })
}
