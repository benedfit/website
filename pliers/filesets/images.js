module.exports = createFileset

function createFileset(pliers, config) {

  pliers.filesets('images', __dirname + '/../../' + config.src + '/img/**/*.{gif,jpg,jpeg,png,svg}')

}
