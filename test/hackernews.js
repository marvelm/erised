const Promise = require('bluebird')
const {assert} = require('chai')
const mockery = require('mockery')

describe('HackerNews fetcher', () => {
  let actual = {operations: []}
  require('./nightmare').register(actual)

  mockery.registerMock('request-promise', (req) => {
    if (req && req.uri === 'https://hacker-news.firebaseio.com/v0/item/14639967.json') {
      return Promise.resolve(require('../fixtures/hackernews.json'))
    }

    if (req && req.uri === 'https://hacker-news.firebaseio.com/v0/item/9049208.json') {
      return Promise.resolve(require('../fixtures/ask-hn.json'))
    }

    throw new Error('Unknown HTTP req', req)
  })

  const hn = require('../src/hackernews')

  it('should return true if valid HN link', () => {
    assert(hn.isHNPost('https://news.ycombinator.com/item?id=14639967'))
  })

  it('should return false if valid HN link', () => {
    assert.isNotOk(hn.isHNPost('https://news.blahblah.com/item?id=14639967'))
    assert.isNotOk(hn.isHNPost('https://news.blahblah.com/item?blah=14639967'))
    assert.isNotOk(hn.isHNPost('https://news.blahblah.com/blah?blah=14639967'))
  })

  describe('HN link post', () => {
    it('should fetch the discussion and article', () => {
      const url = 'https://news.ycombinator.com/item?id=14639967'
      return hn.fetchHNPost(url)
        .then(pages => assert.lengthOf(pages, 2))
    })
  })

  describe('Ask HN', () => {
    it('should fetch only the discussion', () => {
      const url = 'https://news.ycombinator.com/item?id=9049208'
      return hn.fetchHNPost(url)
        .then(pages => assert.lengthOf(pages, 1))
    })
  })
})
