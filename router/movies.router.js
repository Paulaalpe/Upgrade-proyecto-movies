const express = require('express');

const Movie = require('../models/Movie');

const router = express.Router();
// const basePath = '/movies';


//Crear un endpoint get que devuelva todas las películas
router.get('/', (req,res) => {
    Movie.find()
        .then((movies) => {
            return res.json(movies);
        })
        .catch ((error) => {
            console.error('Error en GET /', error);
            return res.status(500).json('Ha ocurrido un error en el servidor');
        })
});

// Crear un endpoint get que devuelva una película según su _id
router.get('/:id', (req,res) => {
    const id = req.params.id;
    Movie.findById(id)
        .then(movie => res.json(movie))
        .catch (error => {
            console.error(`Error en GET /${id}`, error);
            return res.status(500).json('Ha ocurrido un error en el servidor');
           
        })
});

//Crear un endpoint get que devuelva un valor por su titulo
router.get('/title/:title', (req,res) => {
    const titulo = req.params.title;
    return Movie.find({ title: titulo })
        .then((movies) => {
            return res.json(movies);
        })
        .catch (error => {
            console.error(`Error en GET /${title}`, error);
            return res.status(500).json('Ha ocurrido un error en el servidor');
           
        })
});

// Crear un endpoint get que devuelva los documentos según su género
router.get('/genre/:genre', (req,res) => {
    const genero = req.params.genre;
    return Movie.find({ genre: genero })
        .then((movies) => {
            return res.json(movies);
        })
        .catch (error => {
            console.error(`Error en GET /${title}`, error);
            return res.status(500).json('Ha ocurrido un error en el servidor');
           
        })
});

// Crear un endpoint get que devuelva las películas que se han estrenado a partir de un año concreto
router.get('/year/:year', (req,res) => {
    const anno = req.params.year;
    return Movie.find({ year: {$gte:anno} })
        .then((movies) => {
            return res.json(movies);
        })
        .catch (error => {
            console.error(`Error en GET /${title}`, error);
            return res.status(500).json('Ha ocurrido un error en el servidor');
           
        })
});

module.exports = router;