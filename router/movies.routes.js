const express = require('express');

const Movie = require('../models/Movie');

const router = express.Router();
// const basePath = '/movies';


//Crear un endpoint get que devuelva todas las películas
router.get('/', (req, res, next) => {
    Movie.find()
        .then((movies) => {
            return res.json(movies);
        })
        .catch ((error) => {    
            const errorOcurrido = new Error();     
            return next(errorOcurrido);
        })
});

// Crear un endpoint get que devuelva una película según su _id
router.get('/:id', (req, res, next) => {
    const id = req.params.id;
    Movie.findById(id)
        .then(movie => {
            if (!movie) {
                const error = new Error(`Movie con id ${id} no encontrada`);
                error.status = 404;
                return next(error);
            }
            return res.json(movie)
        })           
        .catch(error => {
            return next(new Error());           
        })
});

//Crear un endpoint get que devuelva un valor por su titulo
router.get('/title/:title', (req, res, next) => {
    const titulo = req.params.title;
    return Movie.find({ title: titulo })
        .then((movies) => {
            return res.json(movies);
        })
        .catch ((error) => {
            return next(new Error());           
        })
});

// Crear un endpoint get que devuelva los documentos según su género
router.get('/genre/:genre', (req, res, next) => {
    const genero = req.params.genre;
    return Movie.find({ genre: genero })
        .then((movies) => {
            return res.json(movies);
        })
        .catch ((error) => {
            return next(new Error());           
        })
});

// Crear un endpoint get que devuelva las películas que se han estrenado a partir de un año concreto
router.get('/year/:year', (req, res, next) => {
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

// Crear un método post de Movies para crear una nueva película.
router.post('/', (req, res, next) => {
    const nuevaMovie = new Movie({
        title: req.body.title,
        director: req.body.director,
        year: req.body.year,
        genre: req.body.genre,
    });

    nuevaMovie.save()
        .then(() => {
            return res.status(201).json(nuevaMovie);
        }).catch((error) => {
            return next(error);
        });
});

// Crear un método put de Movies para modificar una película.
router.put('/:id', (req, res, next) => {
    const movieId = req.params.id;
    const nuevaMovie = new Movie(req.body);
    nuevaMovie._id = movieId;
    Movie.findByIdAndUpdate(movieId, nuevaMovie, { new: true })
        .then((movieActualizada) => {
            res.status(200).json(movieActualizada);
    })
    .catch(error => {
        next(error);
    });
})


// Crear un método delete de Movies para eliminar una película.
router.delete('/:id', (req, res, next) => {
    const movieId = req.params.id;
    Movie.findByIdAndDelete(movieId)
    .then(() => {
        return res.status(200).json(`Movie con id ${movieId} eliminada`);
    })
    .catch(error => {
        next(error);
    });
})


module.exports = router;