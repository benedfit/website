const CleanCSS = require('clean-css')

module.exports = function () {
  return function (style) {
    style = this || style
    style.on('end', function (_, css) {
      const output = new CleanCSS().minify(css)
      return output.styles
    })
  }
}
