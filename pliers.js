module.exports = tasks;

var { globSync } = require("glob"),
  createConfigury = require("configury"),
  configury = createConfigury("./config.json"),
  config = configury(process.env.NODE_ENV);

function tasks(pliers) {
  // Load pliers plugins
  globSync(__dirname + "/pliers/*.js").forEach(function (file) {
    require(file)(pliers, config);
  });

  // Load filesets
  globSync(__dirname + "/pliers/filesets/*.js").forEach(function (file) {
    require(file)(pliers, config);
  });
}
