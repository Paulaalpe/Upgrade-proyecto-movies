require('./db/db');
const express = require('express');
const moviesRouter = require('./router/movies.routes');
const cinemasRouter = require('./router/cinemas.routes');
const server = express();
const PORT = 3000;

server.use(express.json());
server.use(express.urlencoded({ extended: false }));

server.use('/movies', moviesRouter);
server.use('/cinemas', cinemasRouter);

server.use('*', (req, res, next) => {
    const error = new Error('Ruta no encontrada');
    error.status = 404;
    next(error);
});

server.use((err, req, res, next) => {
    console.error('[ERROR] Ha ocurrido un error: ', err.status, err.message);
    return res.status(err.status || 500).json(err.message || 'Ha ocurrido un error en el servidor');
});

server.listen(PORT, () =>{
    console.log(`Servidor arrancado en el puerto ${PORT}`);
});