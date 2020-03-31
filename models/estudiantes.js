'use strict';
module.exports = (sequelize, DataTypes) => {
  const Estudiantes = sequelize.define('Estudiantes', {
    matricula: DataTypes.INTEGER,
    aMaterno: DataTypes.STRING,
    aPaterno: DataTypes.STRING,
    nombre: DataTypes.STRING,
    semestreIngreso: DataTypes.INTEGER,
    creditosCursados: DataTypes.INTEGER
  }, {});
  Estudiantes.associate = function(models) {
    // associations can be defined here
    Estudiantes.belongsToMany(models.Cursos,{through: models.CursosEstudiantes});
  };
  return Estudiantes;
};
