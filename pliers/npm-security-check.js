module.exports = createTask

function createTask(pliers) {
  pliers('npmSecurityCheck', require('pliers-npm-security-check')(pliers))
}
