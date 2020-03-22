const Sequelize = require('sequelize');

const sequelize = new Sequelize(
  'escolar',
  'backenduser',
  'superpassword',
  {
    host: 'localhost',
    dialect: 'mysql'
  });

const Curso = sequelize.define('curso',{
  clave: {
    type: Sequelize.INTEGER,
    allowNull: false,
    unique: true
  },
  nombre: {
    type: Sequelize.STRING,
    allowNull: false
  },
  creditos: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
});

exports.Curso = Curso;
exports.Sequelize = Sequelize;
exports.sequelize = sequelize;
