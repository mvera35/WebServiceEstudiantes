'use strict';
module.exports = (sequelize, DataTypes) => {
  const CursosEstudiantes = sequelize.define('CursosEstudiantes', {
    clave_curso: DataTypes.INTEGER,
    matricula_estudiante: DataTypes.INTEGER
  }, {});
  CursosEstudiantes.associate = function(models) {
    // associations can be defined here
    CursosEstudiantes.belongsTo(models.Cursos,{foreignKey:"clave"})
    CursosEstudiantes.belongsTo(models.Estudiantes,{foreignKey:"matricula"})
  };
  return CursosEstudiantes;
};
