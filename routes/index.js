const express = require('express');
const router = express.Router();
const estudiantesController =
require('../controllers/estudiantesController');



const cursosController =
require('../controllers/cursosController');

router.use(express.json());


router.post('/estudiantes', estudiantesController.create);
router.get('/estudiantes', estudiantesController.findAll);
router.delete('/estudiantes',estudiantesController.deleteAll);
router.get('/estudiantes/:id', estudiantesController.findByMatricula);
router.put('/estudiantes/:id', estudiantesController.update);
router.patch('/estudiantes/:id', estudiantesController.update);
router.delete('/estudiantes/:id',estudiantesController.deleteByMatricula);

router.post('/cursos', cursosController.create);
router.get('/cursos', cursosController.findAll);
router.delete('/cursos',cursosController.deleteAll);
router.get('/cursos/:id', cursosController.findByClave);
router.put('/cursos/:id', cursosController.update);
router.patch('/cursos/:id', cursosController.update);
router.delete('/cursos/:id',cursosController.deleteByClave);

router.post('/estudiantes/:id/inscribir/:idcurso',cursosController.inscribir);
router.delete('/estudiantes/:id/inscribir/:idcurso',cursosController.deleteEstudianteLista);
router.get('/cursos/:id/lista',cursosController.getLista);

module.exports = router;
