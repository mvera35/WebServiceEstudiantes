'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('estudiantes', {
      matricula: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        onDelete: 'CASCADE'
      },
      nombre: {
        type: Sequelize.STRING,
        allowNull: false
      },
      semestreIngreso: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 1
      },
      creditosCursados: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 0
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('estudiantes');
  }
};
