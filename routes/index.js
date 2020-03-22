const express = require('express');
const router = express.Router();
const cursosController =
require('../controllers/cursosController');

router.use(express.json());

router.post('/cursos', cursosController.create);
module.exports = router;
