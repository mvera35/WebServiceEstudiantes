const Sequelize = require('sequelize');

const sequelize = new Sequelize(
  'escolar',
  'backenduser',
  'superpassword',
  {
    host: 'localhost',
    dialect: 'mysql'
  });

const Estudiante =
sequelize.define('estudiante',{
  //atributos
  matricula: {
    type: Sequelize.INTEGER,
    allowNull: false,
    unique: true
  },
  aPaterno:{
    type: Sequelize.STRING,
    allowNull: false
  },
  aMaterno:{
    type: Sequelize.STRING,
    allowNull: false
  },
  nombre:{
    type: Sequelize.STRING,
    allowNull: false
  },
  semestreIngreso: {
    type: Sequelize.STRING,
    allowNull: false
  },
  creditosCursados: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0
  }
});

exports.Estudiante = Estudiante;
exports.Sequelize = Sequelize;
exports.sequelize = sequelize;
