const modelo = require('../models/cursosModel.js');
const express = require('../node_modules/express');
const Curso = modelo.Curso;
const app = express();
app.use(express.json());

//Función para crear un nuevo curso en la base de datos
exports.create = function(req,res){
  let curso = req.body;//guardamos el request body
  Curso.create({
    clave: curso.clave,
    nombre: curso.nombre,
    creditos: curso.creditos
  });
}
