import Sequelize from 'sequelize';
import Umzug from 'umzug';
import path from 'path';

import { erised_path } from './util';

const sequelize = new Sequelize('erised', null, null, {
  dialect: 'sqlite',
  storage: path.join(erised_path, 'erised.sqlite3'),
  logging: false
});

export const Page = sequelize.define('pages', {
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
});

export function initDb() {
  return sequelize.sync()
    .then(function runMigrations() {
      const umzug = new Umzug({
        storage: 'sequelize',
        storageOptions: {
          sequelize
        },
        migrations: {
          params: [sequelize.getQueryInterface(), sequelize],
          path: 'migrations',
          pattern: /^\d+.+\.js$/
        }
      });

      return umzug.up();
    });
}
