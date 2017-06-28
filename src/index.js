const Promise = require('bluebird')
const fs = Promise.promisifyAll(require('fs-extra'))

const { initDb, Page } = require('./db')
const fetch = require('./fetch')
const hn = require('./hackernews')
const { archivePath } = require('./util')

let initialized = false
function init () {
  if (initialized) return Promise.resolve()

  initialized = true
  return Promise.join(
    fs.mkdirpAsync(archivePath),
    initDb()
  )
}

function archivePage (url, tags) {
  tags = tags || ''
  return init()
    .then(() => {
      if (hn.isHNPost(url)) {
        return hn.fetchHNPost(url)
      }
      return fetch(url).then(Array.of)
    })
    .each(page => {
      if (page.tags && page.tags !== '') {
        page.tags += ',' + tags
      } else {
        page.tags = tags
      }
    })
    .map(page => Page.create(page))
}

function getAllPages () {
  return init()
    .then(() => Page.findAll())
}

module.exports = {
  archivePage,
  fetch,
  getAllPages,
  Page
}
