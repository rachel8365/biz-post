const mongoose = require("mongoose")

//creating schema
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minlength: 2
    },
    lastName: {
        type: String,
        required: true,
        minlength: 2
    },
    middleName: {
        type: String
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
    password: {
        type: String,
        required: true,
        minlength: 8
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
        minlength: 2
    },
    country: {
        type: String,
        required: true,
        minlength: 2
    },
    street: {
        type: String,
        required: true,
        minlength: 2
    },
    houseNumber: {
        type: Number,
        required: true
    },
    zip: {
        type: Number
    },
    role: {
        type: String
    },
    favCards: [{ type: mongoose.Schema.Types.ObjectId, ref: "cards" }]
})

//creating modal
const User = mongoose.model("users", userSchema)
module.exports = User;