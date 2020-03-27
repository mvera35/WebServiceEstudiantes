'use strict';
module.exports = (sequelize, DataTypes) => {
  const Curso = sequelize.define('cursos', {
    clave:{
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
      onDelete: 'CASCADE',
    },
    nombre:{
      type:DataTypes.STRING,
      allowNull: false
    },
    creditos:{
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    }
  }, {});
  Curso.associate = function(models) {
    // associations can be defined here
    Curso.beLongsToMany(models.Estudiante,{
      through: models.cursoEstudiante
    });
  };
  return cursosModel;
};
