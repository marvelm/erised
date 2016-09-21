import Sequelize from 'sequelize';
import path from 'path';

import { erised_path } from './util';

export const db = new Sequelize('erised', null, null, {
  dialect: 'sqlite',
  storage: path.join(erised_path, 'erised.sqlite3')
});

export const Page = db.define('pages', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
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
  return db.sync({ force: true });
}
