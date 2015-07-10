module.exports = createFileset

function createFileset(pliers, config) {

  pliers.filesets('src', __dirname + '/../../' + config.src + '/**/*.*')

}
