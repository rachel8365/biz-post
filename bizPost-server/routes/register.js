const chalk = import("chalk").then(m => m.default);
const express = require("express")
const joi = require("joi")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const User = require("../models/User")

const router = express.Router()

async function errorMassage(error) {
    const _chalk = await chalk;
    console.log(_chalk.red("Something is wrong, check the data again"));
}

const registerSchema = joi.object({
    firstName: joi.string().required().min(2),
    lastName: joi.string().required().min(2),
    middleName: joi.string().allow(''),
    phone: joi.string().required().min(9),
    email: joi.string().required().email(),
    password: joi.string().required().min(8),
    imageUrl: joi.string().allow(''),
    imageAlt: joi.string().allow(''),
    state: joi.string().allow(''),
    city: joi.string().required().min(2),
    country: joi.string().required().min(2),
    street: joi.string().required().min(2),
    houseNumber: joi.number().required(),
    zip: joi.number().allow(''),
    role: joi.string().allow(''),
    favCards: joi.array().allow('')
})
router.post("/", async (req, res) => {
    try {
        // 1. joi validation
        const { error } = registerSchema.validate(req.body);
        if (error) {
            errorMassage(error)
            return res.status(400).send(error)
        }

        // 2. check if user already exist
        let user = await User.findOne({ email: req.body.email })
        if (user) res.status(400).send("User alredy exist")

        // 3. create the user
        user = new User(req.body)

        // 4. encrypt the password 
        let salt = await bcrypt.genSalt(10)
        user.password = await bcrypt.hash(user.password, salt)

        // 5. save user
        await user.save()

        // 6. create the token & response
        const token = jwt.sign(
            { _id: user._id, role: user.role, email: user.email },
            process.env.jwtKey
        )
        res.status(201).send(token)

    } catch (error) {
        errorMassage(error)
        res.status(400).send(error)
    }
})

module.exports = router;