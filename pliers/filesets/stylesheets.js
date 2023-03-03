const { join } = require('path')

module.exports = createFileset

function createFileset(pliers, config) {
  const path = join(__dirname, '/../../', config.src, '/stylus/**/')

  pliers.filesets('stylesheets', join(path, '*.styl'), join(path, '_*'))
}
