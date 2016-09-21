'use strict';
var Sequelize = require('sequelize');

module.exports = {
  up: function (queryInterface, sequelize) {
    return queryInterface.addColumn(
      'pages',
      'title',
      Sequelize.STRING
    );
  },

  down: function (queryInterface, sequelize) {
    return queryInterface.removeColumn(
      'pages',
      'title'
    );
  }
};
