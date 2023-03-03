const { join } = require('path')

module.exports = createFileset

function createFileset(pliers, config) {
  pliers.filesets(
    'stylus',
    join(__dirname, '/../../', config.src, '/stylus/**/*.styl')
  )
}
