module.exports = tasks

const glob = require('glob')
const createConfigury = require('configury')
const { join } = require('path')
const configury = createConfigury('./config.json')
const config = configury(process.env.NODE_ENV)

function tasks(pliers) {
  // Load pliers plugins
  glob.sync(join(__dirname, '/pliers/*.js')).forEach(function (file) {
    require(file)(pliers, config)
  })

  // Load filesets
  glob.sync(join(__dirname, '/pliers/filesets/*.js')).forEach(function (file) {
    require(file)(pliers, config)
  })
}
