module.exports = createFileset

function createFileset(pliers, config) {

  pliers.filesets('jade', __dirname + '/../../' + config.src + '/views/**/*.jade')

}
