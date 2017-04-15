const Promise = require('bluebird')
const fs = Promise.promisifyAll(require('fs-extra'))

const { initDb, Page } = require('./db')
const fetch = require('./fetch')
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
    .then(() => fetch(url))
    .tap(res => {
      res.tags = tags
    })
    .then(res => Page.create(res))
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
