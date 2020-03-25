const Sequelize = require('sequelize');
const modelo = require('../models/cursosModel.js');
const modelo2 = require('../models/estudiantesCursosModel.js');
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

//Definimos los campos del estudiante
const Estudiante =
sequelize.define('estudiantes',{
  //atributos
  matricula: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    onDelete: 'CASCADE',
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
//Aquí se declaran los campos del modelo
class e extends Estudiante {}
e.init({},{sequelize});

Estudiante.associate = function(models){
  Estudiante.belongsToMany(models.Curso,{
    through: models.Lista,
  });
  return Estudiante;
};

Estudiante.sync({force: false});

//Exportamos las constantes
exports.Estudiante = Estudiante;
exports.Sequelize = Sequelize;
exports.sequelize = sequelize;
