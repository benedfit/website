module.exports = tasks

const { join } = require('path')
const { globSync } = require('glob')
const createConfigury = require('configury')
const configury = createConfigury('./config.json')
const config = configury(process.env.NODE_ENV)

function tasks(pliers) {
  // Load pliers plugins
  globSync(join(__dirname, '/pliers/*.js')).forEach(function (file) {
    require(file)(pliers, config)
  })

  // Load filesets
  globSync(join(__dirname, '/pliers/filesets/*.js')).forEach(function (file) {
    require(file)(pliers, config)
  })
}
