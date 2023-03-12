'use strict';

export function up(queryInterface, Sequelize) {
  return Promise.all([
    queryInterface.addColumn(
      'users',
      'password',
      Sequelize.STRING
    ),
    queryInterface.addColumn(
      'users',
      'isAdmin',
      Sequelize.BOOLEAN
    )
  ]);
}
export function down(queryInterface, Sequelize) {
  return Promise.all([
    queryInterface.removeColumn(
      'users',
      'password',
      Sequelize.STRING
    ),
    queryInterface.removeColumn(
      'users',
      'isAdmin',
      Sequelize.BOOLEAN
    )
  ]);
}
