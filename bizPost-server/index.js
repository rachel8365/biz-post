const chalk = import("chalk").then(m => m.default);
async function main2() {
    const _chalk = await chalk;
    console.log(_chalk.red("hello"));
}
main2()
const express = require("express")
require("dotenv").config()
const mongoose = require("mongoose")
const app = express()
const cors = require("cors")
const register = require("./routes/register")
const login = require("./routes/login")
const cards = require("./routes/cards")
const users = require("./routes/users")
const morgan = require("morgan")


const port = process.env.PORT || 3000;

mongoose
    .connect(process.env.DB, { useNewUrlParser: true })
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.log(err))

app.use(express.json())
app.use(cors())
app.use(morgan('combined'))
app.use("/api/register", register)
app.use("/api/login", login)
app.use("/api/cards", cards)
app.use("/api/users", users)


app.listen(port, () => console.log("Server started on port", port))