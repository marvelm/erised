module.exports = {
  up: (qi, {Sequelize}) => {
    return qi.describeTable('pages')
      .then(table => {
        // There is no better way to do CREATE TABLE IF NOT EXISTS
        // See: https://github.com/sequelize/sequelize/issues/4934
        if (!table['tags']) {
          return qi.addColumn('pages', 'tags', Sequelize.STRING(1024))
        }
      })
  },
  down: (qi, _Sequelize) => qi.removeColumn('pages', 'tags')
}
