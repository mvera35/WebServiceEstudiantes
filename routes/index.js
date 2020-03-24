const express = require('express');
const router = express.Router();
const estudiantesController =
require('../controllers/estudiantesController');

const cursosController =
require('../controllers/cursosController');

router.use(express.json());


router.post('/cursos', cursosController.create);
router.get('/cursos', cursosController.findAll);
router.delete('/cursos',cursosController.deleteAll);
router.get('/cursos/:id', cursosController.findByClave);
router.put('/cursos/:id', cursosController.update);
router.patch('/cursos/:id', cursosController.update);
router.delete('/cursos/:id',cursosController.deleteByClave);

module.exports = router;
