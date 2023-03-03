const assert = require('assert')
const createConfigury = require('configury')
const { join } = require('path')
const createPliers = require('pliers').bind(null, { logLevel: 'fatal' })
const configury = createConfigury('./config.json')
const config = configury(process.env.NODE_ENV)
let pliers

describe('pliers', function () {
  beforeEach(function (done) {
    this.timeout(0)

    pliers = createPliers()

    require(join(__dirname, '/../pliers'))(pliers, config)

    done()
  })

  it('should have filesets', function () {
    assert.equal(
      Object.prototype.hasOwnProperty.call(pliers.filesets, 'images'),
      true
    )
    assert.equal(
      Object.prototype.hasOwnProperty.call(pliers.filesets, 'jade'),
      true
    )
    assert.equal(
      Object.prototype.hasOwnProperty.call(pliers.filesets, 'pages'),
      true
    )
    assert.equal(
      Object.prototype.hasOwnProperty.call(pliers.filesets, 'src'),
      true
    )
    assert.equal(
      Object.prototype.hasOwnProperty.call(pliers.filesets, 'stylesheets'),
      true
    )
    assert.equal(
      Object.prototype.hasOwnProperty.call(pliers.filesets, 'stylus'),
      true
    )
  })
})
