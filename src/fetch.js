const path = require('path')

const Promise = require('bluebird')
const Nightmare = require('nightmare')

const { archivePath } = require('./util')

function fetch (url) {
  const file = process.hrtime()[1]
  const pdf = path.join(archivePath, `${file}.pdf`)
  const screenshot = path.join(archivePath, `${file}.png`)
  const html = path.join(archivePath, `${file}.html`)

  const n = Nightmare({
    show: true,
    Promise
  })

  return n
    .goto(url)
    .wait(0)

    .screenshot(screenshot)
    .pdf(pdf)
    .html(html)

    .evaluate(function () {
      return document.title
    })

    .end()
    .then(title => ({ title, url, screenshot, pdf, html }))
}

module.exports = fetch
