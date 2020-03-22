const modeloEstudiante = require('./models/estudiantesModel.js');
const modeloCurso = require('./models/cursosModel.js');
//En caso que las tablas no existan, se crean dentro de la base de datos
//base de datos: escolar 
modeloEstudiante.Estudiante.sync({force: false});
modeloCurso.Curso.sync({force: false});
