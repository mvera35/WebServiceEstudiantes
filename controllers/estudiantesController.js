const modelo = require('../models');
const express = require('../node_modules/express');
const Estudiante = modelo.Estudiantes;
const app = express();
app.use(express.json());

//Función para crear un nuevo estudiante en la base de datos
exports.create = function(req,res){
  let estudiante = req.body;//guardamos el request body
  Estudiante.create({//Ejecutamos el query
    matricula: estudiante.matricula,
    aPaterno: estudiante.aPaterno,
    aMaterno: estudiante.aMaterno,
    nombre: estudiante.nombre,
    semestreIngreso: estudiante.semestreIngreso,
    creditosCursados: estudiante.creditosCursados
  })
  .then(()=>{//En caso que se complete la ejecución
    res.status(201).send("La petición ha sido completada");
  })
  .catch(()=>{//En caso que no se complete la ejecución
    res.status(400).send("Petición no generada");
  })
  .finally(()=>{
    res.end();
  });
}
//Función para obtener todos los estudiantes registrados en la base de datos
exports.findAll = function(req,res){
  Estudiante.findAll()//Ejecutamos el query
  .then(estudiantes=>{//En caso que se complete la ejecución
    res.status(200).send(JSON.stringify(estudiantes,null,4));
  })
  .catch(()=>{//En caso que no se complete la ejecución
    res.status(404).send("recurso no encontrado");
  })
  .finally(()=>{
    res.end();
  });
}

//Función para eliminar todos los estudiantes registrados
exports.deleteAll = function(req,res){
  Estudiante.destroy()//Ejecutamos el query
  .then(()=>{//En caso que se complete la ejecución
    res.status(200).send('Operación realizada con éxito');
  })
  .catch(()=>{//En caso que no se complete la ejecución
    res.status(400).send('Petición no generada');
  })
  .finally(()=>{
    res.end();
  });
}

exports.deleteByMatricula = function(req,res){
  Estudiante.destroy({
    where: {matricula: req.params.id}
  })//Ejecutamos el query
  .then(()=>{//En caso que se complete la ejecución
    res.status(200).send('Operación realizada con éxito');
  })
  .catch(()=>{//En caso que no se complete la ejecución
    res.status(400).send('Petición no generada');
  })
  .finally(()=>{
    res.end();
  });
}

//Función para obtener un estudiante en base a su clave
exports.findByMatricula = function(req,res){
  Estudiante.findOne({//Ejecutamos el query
    where: {matricula: req.params.id}//matrícula del estudiante a buscar
  })
  .then(dato =>{//En caso que se complete la acción
    res.status(200).send(JSON.stringify(dato,null,4));
  })
  .catch(()=>{//En caso que no se complete la acción
    res.status(404).send('recurso no encontrado');
  })
  .finally(()=>{
    res.end();
  });
}
//Función para actualizar un estudiante en base a su matrícula
exports.update = function(req,res){
  let estudiante = req.body;
  Estudiante.update({//Ejecutamos el query
    //Indicamos que atributos cambiar
    aPaterno: estudiante.aPaterno,
    aMaterno: estudiante.aMaterno,
    nombre: estudiante.nombre,
    semestreIngreso: estudiante.semestreIngreso,
    creditosCursados: curso.creditosCursados
  },{ where: {matricula: req.params.id}})//indicamos que curso cambiar
  .then(()=>{
    res.status(201).send('La petición ha sido completada');
  })
  .catch(()=>{
    res.status(404).send('Petición no generada');
  })
  .finally(()=>{
    res.end();
  })
}
