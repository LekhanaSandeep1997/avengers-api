const mongoose = require('mongoose');

const avengerSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 4,
        maxlength: 20,
        required: true
    },
    birthname: String,
    movies: {
        type: [String],
        enum: ["Infinity war", "Endgame", "Iron Man", "The First Avenger"] // enum validator
    },
    imgUrl: String,
    likeCount: Number,
    deceased: Boolean
});

const Avenger = mongoose.model("Avenger", avengerSchema);

module.exports = Avenger;