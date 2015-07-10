var assert = require('assert')
  , createConfigury = require('configury')
  , createPliers = require('pliers').bind(null, { logLevel: 'fatal' })
  , configury = createConfigury('./config.json')
  , config = configury(process.env.NODE_ENV)
  , pliers

describe('pliers', function () {

  before(function (done) {
    this.timeout(0)

    pliers = createPliers()

    require(__dirname + '/../pliers')(pliers, config)

    done()
  })

  it('should have filesets', function () {
    assert.equal(pliers.filesets.hasOwnProperty('images'), true)
    assert.equal(pliers.filesets.hasOwnProperty('jade'), true)
    assert.equal(pliers.filesets.hasOwnProperty('pages'), true)
    assert.equal(pliers.filesets.hasOwnProperty('src'), true)
    assert.equal(pliers.filesets.hasOwnProperty('stylesheets'), true)
    assert.equal(pliers.filesets.hasOwnProperty('stylus'), true)
  })

})
