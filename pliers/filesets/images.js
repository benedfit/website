const { join } = require('path')

module.exports = createFileset

function createFileset(pliers, config) {
  pliers.filesets(
    'images',
    join(__dirname, '/../../', config.src, '/img/**/*.{gif,jpg,jpeg,png,svg}')
  )
}
