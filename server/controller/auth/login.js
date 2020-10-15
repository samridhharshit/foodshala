const user = require('../../database/models/users')
const restaurant = require('../../database/models/restaurant')

const login = async (credentials) => {
    const userResponse = await user.update({email: credentials.email}, {
        access_token: credentials.access_token
    })
    if (userResponse["n"] === 0) {
        const restaurantResponse = await restaurant.update({email: credentials.email}, {
            access_token: credentials.access_token
        })
        if (restaurantResponse["n"] === 0) {
            return {
                status: 404,
                message: "No Valid user found!"
            }
        }
        return await restaurant.find({email: credentials.email})
    }
    return await user.find({email: credentials.email})
}

module.exports = login