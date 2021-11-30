const mongoose = require('mongoose');
const Cinema = require('../models/Cinema');
const dbConnection = require('../db/db');


const cinemas = [
    {
      nombre: "Cine Pau",
      location: "Carabanchel",
    },  
  
  ];

  const cinemasDocuments = cinemas.map(cinema => new Cinema(cinema));

  dbConnection
    .then(async () => {
        const allCinemas = await Cinema.find();
        if (allCinemas.length > 0) {
            await Cinema.collection.drop();
        }
    })
    .catch((error) => console.error('Error eliminando colección Cinemas:', error))
    .then(async () => {
        await Cinema.insertMany(cinemasDocuments)
    })
    .catch((error) => console.error('Error al insertar en Cinema:', error))

    .finally(() => mongoose.disconnect());