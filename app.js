const express = require('express');
const app = express();
const port = 4000;
const router = require('./routes/index');

const modeloEstudiante = require('./models/estudiantesModel.js');
const modeloCurso = require('./models/cursosModel.js');
//En caso que las tablas no existan, se crean dentro de la base de datos
//base de datos: escolar
modeloEstudiante.Estudiante.sync({force: false});
modeloCurso.Curso.sync({force: false});

app.use(router);
app.listen(port, () => {
console.log('Servidor escuchando por el puerto:',port);
}).on('error', err => {
console.log('Error al inciar el servidor:',err);
});
