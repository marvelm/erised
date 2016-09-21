import { argv } from 'yargs';
import Promise from 'bluebird';

import fetch from './fetch';
import { archive_path } from './util';
import { initDb, Page } from './db';

const fs = Promise.promisifyAll(require('fs-extra'));

function init() {
  return Promise.join(
    fs.mkdirpAsync(archive_path),
    initDb()
  );
}

const url = argv._[0];
if (url) {
  init()
    .then(() => fetch(url))
    .then(res => Page.create(res));
}
