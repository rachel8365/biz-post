const mongoose = require("mongoose")

//creating schema
const cardSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    subtitle: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
        maxlength: 200
    },
    phone: {
        type: String,
        required: true,
        minlength: 9
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    web: {
        type: String
    },
    imageUrl: {
        type: String
    },
    imageAlt: {
        type: String
    },
    state: {
        type: String
    },
    city: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
    street: {
        type: String,
        required: true,
    },
    houseNumber: {
        type: Number,
        required: true,
    },
    zip: {
        type: Number
    },
    userId: {
        type: String,

    },
})

//creating modal
const Card = mongoose.model("cards", cardSchema)
module.exports = Card