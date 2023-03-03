const { join } = require('path')

module.exports = createFileset

function createFileset(pliers, config) {
  pliers.filesets('src', join(__dirname, '/../../', config.src, '/**/*.*'))
}
