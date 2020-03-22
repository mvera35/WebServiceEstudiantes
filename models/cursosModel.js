const Sequelize = require('sequelize');
//Mediante Sequelize podremos conectarnos a la base de datos
const sequelize = new Sequelize(
  'escolar',//nombre de la base de datos
  'backenduser',//usuario
  'superpassword',//contraseña
  {
    host: 'localhost',
    dialect: 'mysql',//Indicamos que el dialecto es mysql
    define:{
      /*Aquí eliminamos unos valores por defecto en el modelo Curso,
      es decir, evitamos que aparezcan campos no indicados a la hora
      de crear una tabla*/
      timestamps: false
    }
  });
//Definimos los campos del curso
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
//Aquí se declaran los campos del modelo
class e extends Curso {}
e.init({},{sequelize});

//Exportamos las constantes
exports.Curso = Curso;
exports.Sequelize = Sequelize;
exports.sequelize = sequelize;
