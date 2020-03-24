const express = require('express');
const app = express();
const port = 4000;
const router = require('./routes/index');

app.use(router);
app.listen(port, () => {
console.log('Servidor escuchando por el puerto:',port);
}).on('error', err => {
console.log('Error al inciar el servidor:',err);
});
