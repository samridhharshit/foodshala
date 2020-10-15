const mongoose = require('mongoose')
const schema = mongoose.Schema

const userSchema = schema({
    name: String,
    email: String,
    access_token: String,
    type: String,
    food_preference: String
})

const user = mongoose.model("users", userSchema)

module.exports = user