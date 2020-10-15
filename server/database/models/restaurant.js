const mongoose = require('mongoose')
const schema = mongoose.Schema

const restaurantSchema = schema({
    _id: mongoose.ObjectId,
    name: String,
    email: String,
    access_token: String,
    type: String,
})

const restaurant = mongoose.model("restaurant", restaurantSchema)

module.exports = restaurant