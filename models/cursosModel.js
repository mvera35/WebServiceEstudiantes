const Sequelize = require('sequelize');
const modelo = require('../models/estudiantesModel.js');
const modelo2 = require('../models/estudiantesCursosModel.js');
//Mediante Sequelize podremos conectarnos a la base de datos
const sequelize = new Sequelize(
  'escolar',//nombre de la base de datos
  'backenduser',//usuario
  'superpassword',//contraseña
  {
    host: 'localhost',
    define:{
      /*Aquí eliminamos unos valores por defecto en el modelo Curso,
      es decir, evitamos que aparezcan campos no indicados a la hora
      de crear una tabla*/
      timestamps: false
    },
    dialect: 'mysql',//Indicamos que el dialecto es mysql
  });
//Definimos los campos del curso
const Curso = sequelize.define('cursos',{
  clave: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    onDelete: 'CASCADE',
  },
  nombre: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  creditos: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});
//Aquí se declaran los campos del modelo
class e extends Curso {}
e.init({},{sequelize});

Curso.associate = function(models){
  Curso.belongsToMany(models.Estudiante,{
    through: models.Lista,
  });
  return Curso;
};
const Lista = sequelize.define('lista',{
  clave: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    references: {
      model: 'cursos',
      key: 'clave'
    }
  },
  matricula: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    references: {
      model: 'estudiantes',
      key: 'matricula'
    }
  }
});
class l extends Lista {}
l.init({},{sequelize});

Curso.sync({force: false})
.then(()=>{
  Lista.sync({force: false});
});

//Exportamos las constantes
exports.Curso = Curso;
exports.Lista = Lista;
exports.Sequelize = Sequelize;
exports.sequelize = sequelize;
