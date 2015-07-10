module.exports = createTask

function createTask(pliers) {

  pliers('cleanShrinkwrap', require('pliers-clean-shrinkwrap')(pliers))

}
