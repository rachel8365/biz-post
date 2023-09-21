const express = require("express")
const auth = require("../middleware/auth");
const Card = require("../models/Card")
const joi = require("joi");
const router = express.Router()
const _ = require("lodash")

const cardSchema = joi.object({
    title: joi.string().required(),
    subtitle: joi.string().required(),
    description: joi.string().required().max(200),
    phone: joi.string().required().min(9),
    email: joi.string().required().email(),
    web: joi.string().allow(''),
    imageUrl: joi.string(),
    imageAlt: joi.string().required(),
    state: joi.string().allow(''),
    city: joi.string().required(),
    country: joi.string().required(),
    street: joi.string().required(),
    houseNumber: joi.number().required(),
    zip: joi.number().allow(''),
    userId: joi.string(),
})

//add card
router.post("/", auth, async (req, res) => {
    try {
        // 1. check if user is admin or business
        if (!req.payload.role == "Admin" && !req.payload.role == "business") return res.status(400).send("Access denied. User is not an admin")

        // 2. joi validation
        const { error } = cardSchema.validate(req.body)
        if (error) {
            return res.status(400).send(error);
        }

        // 3. check if card already exist
        let card = await Card.findOne({
            title: req.body.title,
            subtitle: req.body.subtitle,
            phone: req.body.phone
        })

        if (card) return res.status(400).send("Card already exists")

        // 4. add card
        card = new Card(req.body)
        await card.save()

        // 5. return new card details
        res.status(201).send(card)

    } catch (error) {
        res.status(400).send(error)
    }
})

//get all
router.get("/", async (req, res) => {
    try {
        const cards = await Card.find()
        res.status(200).send(cards)
    } catch (error) {
        res.status(400).send(error)
    }
})

// get card by user - id 
router.get("/by-userid/:userId", auth, async (req, res) => {
    const { userId } = req.params
    try {
        const cards = await Card.find({ userId })
        res.status(200).send(cards)
    } catch (error) {
        res.status(400).send(error)
    }
})



router.put("/my-cards/update/:id", auth, async (req, res) => {
    try {
        // 1. check if user is an admin or business
        if (!req.payload.role == "Admin" && !req.payload.role == "business")
            return res.status(400).send("Access denied. You do not have permission to update")

        // 2. joi validation
        const { error } = cardSchema.validate(req.body)
        if (error) return res.status(400).send(error)
        // 3. check if card alredy exist
        let card = await Card.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true })

        if (!card) return res.status(400).send("Card already exist")

        res.status(200).send(card)
    } catch (error) {
        res.status(400).send(error)
    }
})

// get card details
router.get("/card-detailse/:cardId", async (req, res) => {
    try {
        const card = await Card.findById(req.params.cardId)
        res.status(200).send(_.pick(card, ["imageUrl", "imageAlt", "title", "subtitle", "description", "country", "city", "street", "houseNumber", "email", "phone", "web"]))
    } catch (error) {
        res.status(400).send(error)
    }
})

//delet card by id
router.delete("/:id", auth, async (req, res) => {
    try {
        // check if user is an admin or business
        if (!req.payload.role == "Admin" && !req.payload.role == "business")
            return res.status(400).send("Access denied. You do not have permission to delete")
        let card = await Card.findByIdAndDelete({ _id: req.params.id })
        if (!card) return res.status(404).send("No such card")
        res.status(200).send("Card deleted successfully!");
    } catch (error) {
        res.status(400).send(error)
    }
})


module.exports = router;