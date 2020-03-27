'use strict';
module.exports = (sequelize, DataTypes) => {
  const Estudiante = sequelize.define('estudiantes', {
    nombre:{
      type:DataTypes.STRING,
      allowNull: false
    },
    matricula: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
      onDelete: 'CASCADE',
    },
    semestreIngreso: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 1
    },
    creditosCursados: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    }
  }, {});
  Estudiante.associate = function(models) {
    Estudiante.beLongsToMany(models.Curso,{
      through: model.cursoEstudiante
    });
  };
  return Estudiante;
};
