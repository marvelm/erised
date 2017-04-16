const homedir = require('homedir')

const path = require('path')

const erisedDirectory = '.erised'
const erisedPath = process.env.ERISED_PATH || path.join(homedir(), erisedDirectory)

const archiveDirectory = 'archive'
const archivePath = path.join(erisedPath, archiveDirectory)

module.exports = {
  erisedDirectory,
  erisedPath,

  archiveDirectory,
  archivePath
}
