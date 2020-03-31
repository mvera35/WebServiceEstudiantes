'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Estudiantes', {
      matricula: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      aMaterno: {
        type: Sequelize.STRING
      },
      aPaterno: {
        type: Sequelize.STRING
      },
      nombre: {
        type: Sequelize.STRING
      },
      semestreIngreso: {
        type: Sequelize.INTEGER
      },
      creditosCursados: {
        type: Sequelize.INTEGER
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
    return queryInterface.dropTable('Estudiantes');
  }
};
