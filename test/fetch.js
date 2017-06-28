const {assert} = require('chai')

describe('fetch', () => {
  let actual = {operations: []}
  require('./nightmare').register(actual)

  const fetch = require('../src/fetch')

  // Mutates actual
  before(() => fetch('http://example.com'))

  it('should show the browser', () => {
    assert(actual.arg.show)
  })

  it('should execute operations in the correct order', () => {
    const expectedOperations = [
      {method: 'goto', url: 'http://example.com'},
      'wait',
      'screenshot',
      'pdf',
      'html',
      'evaluate',
      'end',
      'then'
    ]

    assert.deepEqual(actual.operations, expectedOperations)
  })

  it('should close the Nightmare instance', () => {
    assert.include(actual.operations, 'end')
  })

  it('should return a Promise with Page object', () => {
    const expectedAttributes = [ 'html', 'pdf', 'screenshot', 'title', 'url' ]
    const actualAttributes = Object.keys(actual.results[0]).sort()

    assert.deepEqual(actualAttributes, expectedAttributes)
  })
})
