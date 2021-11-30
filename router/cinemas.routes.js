const express = require('express');

const Cinema = require('../models/Cinema');

const router = express.Router();


//Crear un endpoint get que devuelva todos los cines
router.get('/', (req, res, next) => {
    Cinema.find().populate('pelis')
        .then((cinemas) => {
            return res.json(cinemas);
        })
        .catch ((error) => {   
            next(error);         
        });
});

// Crear un endpoint get que devuelva un cine según su _id
router.get('/:id', (req, res, next) => {
    const id = req.params.id;
    Cinema.findById(id).populate('pelis')
        .then(cinema => {
            if (!cinema) {
                const error = new Error(`Cine con id ${id} no encontrado`);
                error.status = 404;
                return next(error);
            }
            return res.json(cinema)
        })           
        .catch(error => {
            next(error);           
        })
});

// Crear un endpoint get que devuelva solo pelis del cine indicado
router.get('/:id/pelis', (req, res, next) => {
    const cinemaId = req.params.id;
    Cinema.findById(cinemaId).populate('pelis')
        .then(cinema => {
            if (!cinema) {
                const error = new Error(`Cine con id ${id} no encontrado`);
                error.status = 404;
                return next(error);
            }
            return res.json(cinema)
        })           
        .catch(error => {
            next(error);           
        })
});


// Crear un método post de Cinema para crear un nuevo cine.
router.post('/', (req, res, next) => {
    const nuevoCinema = new Cinema({
        nombre: req.body.nombre,
        location: req.body.location,
        pelis: req.body.pelis || [],
    });
    nuevoCinema.save()
        .then(() => {
            return res.status(201).json(nuevoCinema);
        }).catch((error) => {
            next(error);
        });
});

// Crear un método put de Cinema para modificar un cine.
router.put('/:id', (req, res, next) => {
    const error = new Error('Metodo no implementado');
    error.status = 405;
    next(error);
    // const cinemaId = req.params.id;
    // const nuevoCinema = new Cinema(req.body);
    // nuevoCinema._id = cinemaId;
    // Cinema.findByIdAndUpdate(cinemaId, nuevoCinema, { new: true })
    //     .then((cinemaActualizado) => {
    //         res.status(200).json(cinemaActualizado);
    // })
    // .catch(error => {
    //     next(error);
    // });
})
// Crear un método put de Cinema para añadir pelis a un cine.
router.put('/:id/pelis', (req, res, next) => {
    const cinemaId = req.params.id;
    const movieId = req.body.movieAAnadir;

    Cinema.findByIdAndUpdate(
        cinemaId, 
        { $push: { pelis: movieId } },
        { new: true }
    )
        .then(cinemaActualizado => {
            res.status(200).json(cinemaActualizado)
        })
        .catch(error => {
            next(error);
        });
});



// Crear un método delete de Cinemas para eliminar un cine.
router.delete('/:id', (req, res, next) => {
    const id = req.params.id;
    Cinema.findByIdAndDelete(id)
    .then(() => {
        return res.status(200).json(`Cine con id ${id} eliminado`);
    })
    .catch(error => {
        next(error);
    });
})


module.exports = router;