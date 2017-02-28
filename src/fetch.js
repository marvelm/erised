const path = require('path')

const Nightmare = require('nightmare')
const { archive_path } = require('./util')

function fetch (url) {
  const file = process.hrtime()[1]
  const pdf = path.join(archive_path, `${file}.pdf`)
  const screenshot = path.join(archive_path, `${file}.png`)
  const html = path.join(archive_path, `${file}.html`)

  const n = Nightmare({ show: true })

  return n
    .goto(url)
    .wait()

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
