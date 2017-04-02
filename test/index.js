const {assert} = require('chai')
const mockery = require('mockery')

const {Page} = require('../src/db')

// Mocha requires all the mentioned modules first
// This clears the module cache so that we can mock the module in the test
mockery.enable({ useCleanCache: true })

class NightmareMock {
  constructor (recorder, arg) {
    this.recorder = recorder
    recorder.arg = arg
  }

  goto (url) {
    this.recorder.operations.push('goto')
    this.recorder.goto = {url}
    return this
  }

  wait () {
    this.recorder.operations.push('wait')
    return this
  }

  screenshot (file) {
    this.recorder.operations.push('screenshot')
    return this
  }

  pdf (file) {
    this.recorder.operations.push('pdf')
    return this
  }

  html (file) {
    this.recorder.operations.push('html')
    return this
  }

  evaluate (fn) {
    this.recorder.operations.push('evaluate')
    return this
  }

  end () {
    this.recorder.operations.push('end')
    return this
  }

  then (fn) {
    this.recorder.operations.push('then')
    this.recorder.result = fn('test title')
    return this
  }
}

describe('fetch', () => {
  let actual = {operations: []}
  mockery.warnOnUnregistered(false);
  mockery.registerMock('nightmare', arg => new NightmareMock(actual, arg))
  const fetch = require('../src/fetch')

  before(() => {
    // Mutates actual
    fetch('http://example.com')
  })

  it('should show the browser', () => {
    assert(actual.arg.show)
  })

  it('should execute operations in the correct order', () => {
    const expected_operations = [
      'goto',
      'wait',
      'screenshot',
      'pdf',
      'html',
      'evaluate',
      'end',
      'then'
    ]

    assert.deepEqual(actual.operations, expected_operations)
  })

  it('should close the Nightmare instance', () => {
    assert.include(actual.operations, 'end')
  })

  it('should return a Promise with Page object', () => {
    const expected_attributes = new Set(Object.keys(Page.attributes))

    // Sequelize includes some default attributes
    // `fetch` won't return these
    for (let key of ['id', 'createdAt', 'updatedAt']) expected_attributes.delete(key)

    const actual_attributes = new Set(Object.keys(actual.result))
    assert.deepEqual(actual_attributes, expected_attributes)
  })
})
