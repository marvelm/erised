module.exports = {
  up: (qi, {Sequelize}) => qi.addColumn('pages', 'tags', Sequelize.STRING(1024)),
  down: (qi, _Sequelize) => qi.removeColumn('pages', 'tags')
}
