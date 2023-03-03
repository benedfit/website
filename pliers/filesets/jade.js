const { join } = require('path')

module.exports = createFileset

function createFileset(pliers, config) {
  pliers.filesets(
    'jade',
    join(__dirname, '/../../', config.src, '/views/**/*.jade')
  )
}
