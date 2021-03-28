var CleanCSS = require("clean-css");

module.exports = function () {
  return function (style) {
    style = this || style;
    style.on("end", function (err, css) {
      var output = new CleanCSS().minify(css);
      return output.styles;
    });
  };
};
