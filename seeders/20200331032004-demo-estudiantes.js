'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Estudiantes', [
        {
          matricula: 1158002,
          aPaterno: "Vera",
          aMaterno: "Vicente",
          nombre: "Jesús Maximiliano",
          semestreIngreso: 4,
          creditosCursados: 212,
          createdAt: new Date(),
          updatedAt: new Date()
        }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
      Example:
      return queryInterface.bulkDelete('Estudiantes', null, {});
  }
};
