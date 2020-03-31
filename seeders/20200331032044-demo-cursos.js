'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Cursos', [
        {
          nombre: "Programación en Perl",
          clave: 100,
          creditos: 6,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          nombre: "POO",
          clave: 200,
          creditos: 8,
          createdAt: new Date(),
          updatedAt: new Date()
        }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
      Example:
      return queryInterface.bulkDelete('Cursos', null, {});
  }
};
