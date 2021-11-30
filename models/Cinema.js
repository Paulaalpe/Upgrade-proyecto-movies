const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const cinemaSchema = new Schema({
    nombre: {type: String, required: true},
    location: {type: String, required: true},
    pelis: [{ type: mongoose.Types.ObjectId, ref: 'Movie' }],//(relación con la colección movies).
}, {
    timestamps: true
});

const Cinema = mongoose.model('Cinema', cinemaSchema);

module.exports = Cinema;