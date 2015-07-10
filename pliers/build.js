module.exports = createTask

function createTask(pliers) {

  // Any building that is needed before running the application
  pliers('build', 'clean', 'buildCss', 'buildHtml')

}
