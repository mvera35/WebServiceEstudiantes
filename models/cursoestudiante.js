'use strict';
module.exports = (sequelize, DataTypes) => {
  const cursoEstudiante = sequelize.define('cursoEstudiante', {
    claveCurso: DataTypes.INTEGER,
    matricula: DataTypes.INTEGER
  }, {});
  cursoEstudiante.associate = function(models) {
    // associations can be defined here
  };
  return cursoEstudiante;
};
