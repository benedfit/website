module.exports = createFileset

function createFileset(pliers, config) {

  var path = __dirname + '/../../' + config.src + '/'

  pliers.filesets
    ('pages'
    , path + '**/*.*'
    , [ path + '_**/**'
      , path + '**/_*'
      , path + 'stylus/**/*.styl'
      , path + 'views/**/*.jade'
      ]
    )

}
