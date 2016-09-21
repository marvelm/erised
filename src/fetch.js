import Nightmare from 'nightmare';
import path from 'path';
import { archive_path } from './util';

export default function fetch(url) {
  const n = Nightmare({ show: true });

  const pdf = path.join(archive_path, `${process.hrtime()[1]}.pdf`);
  const screenshot = path.join(archive_path, `${process.hrtime()[1]}.png`);
  const html = path.join(archive_path, `${process.hrtime()[1]}.html`);

  return n
    .goto(url)
    .wait()

    .screenshot(screenshot)
    .pdf(pdf)
    .html(html)

    .end()
    .then(() => ({ url, screenshot, pdf, html }));
}
