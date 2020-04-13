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
        },
        {
          matricula: 115888,
          aPaterno: "Vera",
          aMaterno: "Perez",
          nombre: "Maximiliano",
          semestreIngreso: 2,
          creditosCursados: 152,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          matricula: 1147012,
          aPaterno: "Perez",
          aMaterno: "Martinez",
          nombre: "Miguel",
          semestreIngreso: 5,
          creditosCursados: 12,
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
