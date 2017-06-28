const Promise = require('bluebird')
const mockery = require('mockery')

// Mocha requires all the mentioned modules first
// This clears the module cache so that we can mock the module in the test
mockery.enable({ useCleanCache: true })

class NightmareMock {
  constructor (recorder, arg) {
    this.recorder = recorder
    this.recorder.results = []
    recorder.arg = arg
  }

  goto (url) {
    this.recorder.operations.push({method: 'goto', url})
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
    const result = fn('title')
    this.recorder.results.push(result)
    return Promise.resolve(result)
  }
}

module.exports = {
  register: (recorder) => {
    mockery.warnOnUnregistered(false)
    mockery.registerMock('nightmare', arg => new NightmareMock(recorder, arg))
  }
}
