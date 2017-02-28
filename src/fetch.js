const  path from 'path';

const Nightmare = require('nightmare');
const { archive_path } = require('./util');

function fetch(url) {
  const pdf = path.join(archive_path, `${process.hrtime()[1]}.pdf`);
  const screenshot = path.join(archive_path, `${process.hrtime()[1]}.png`);
  const html = path.join(archive_path, `${process.hrtime()[1]}.html`);

  const n = Nightmare({ show: true });

  return n
    .goto(url)
    .wait()

    .screenshot(screenshot)
    .pdf(pdf)
    .html(html)

    .evaluate(function() {
      return document.title
    })

    .end()
    .then(title => ({ title, url, screenshot, pdf, html }));
}

module.exports = fetch;
