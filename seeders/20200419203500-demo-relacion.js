'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('CursosEstudiantes', [
      {
        clave_curso:100,
        matricula_estudiante:1158002 ,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        clave_curso: 200,
        matricula_estudiante: 115888,
        createdAt: new Date(),
        updatedAt: new Date()
      }
  ], {});
  },

  down: (queryInterface, Sequelize) => {
    Example:
    return queryInterface.bulkDelete('CursosEstudiantes', null, {});
  }
};
