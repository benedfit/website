module.exports = createFileset

function createFileset(pliers, config) {

  pliers.filesets('stylus', __dirname + '/../../' + config.src + '/stylus/**/*.styl')

}
