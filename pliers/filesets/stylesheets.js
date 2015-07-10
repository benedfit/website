module.exports = createFileset

function createFileset(pliers, config) {

  var path = __dirname + '/../../' + config.src + '/stylus/**/'

  pliers.filesets('stylesheets', path + '*.styl', path + '_*')

}
