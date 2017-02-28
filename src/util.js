const homedir = require('homedir');

const path = require('path');

const erised_directory = '.erised';
const erised_path = path.join(homedir(), erised_directory);

const archive_directory = 'archive';
const archive_path = path.join(erised_path, archive_directory);

module.exports = {
  erised_directory,
  erised_path,

  archive_directory,
  archive_path
};
