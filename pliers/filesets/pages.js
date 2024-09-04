const { join } = require('path')

module.exports = createFileset

function createFileset(pliers, config) {
  const path = join(__dirname, '/../../', config.src, '/')

  pliers.filesets('pages', join(path, '**/*.*'), [
    join(path, '_**/**'),
    join(path, '**/_*'),
    join(path, 'stylus/**/*.styl'),
    join(path, 'views/**/*.pug')
  ])
}
