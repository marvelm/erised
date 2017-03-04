const path = require('path')

const Sequelize = require('sequelize')
const Umzug = require('umzug')

const { erisedPath } = require('./util')

const sequelize = new Sequelize('erised', null, null, {
  dialect: 'sqlite',
  storage: path.join(erisedPath, 'erised.sqlite3'),
  logging: false
})

const Page = sequelize.define('pages', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  title: {
    type: Sequelize.STRING,
    field: 'title'
  },
  url: {
    type: Sequelize.STRING,
    field: 'url'
  },
  html: {
    type: Sequelize.STRING,
    field: 'html'
  },
  pdf: {
    type: Sequelize.STRING,
    field: 'pdf'
  },
  screenshot: {
    type: Sequelize.STRING,
    field: 'screenshot'
  }
})

function initDb () {
  return sequelize.sync()
    .then(function runMigrations () {
      const umzug = new Umzug({
        storage: 'sequelize',
        storageOptions: {
          sequelize
        },
        migrations: {
          params: [sequelize.getQueryInterface(), sequelize],
          path: path.resolve(__dirname, '../migrations'),
          pattern: /^\d+.+\.js$/
        }
      })

      return umzug.up()
    })
}

module.exports = { Page, initDb }
