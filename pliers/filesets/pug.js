const { join } = require('path')

module.exports = createFileset

function createFileset(pliers, config) {
  pliers.filesets(
    'pug',
    join(__dirname, '/../../', config.src, '/views/**/*.pug')
  )
}
