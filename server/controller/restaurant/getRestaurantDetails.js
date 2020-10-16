const restaurants = require('../../database/models/restaurant')

const getRestaurantDetails = async (access_token) => {
    // check if token exists or not ie user is logged in or not
    if (access_token === null ||
        access_token === undefined ||
        access_token === ""
    ) {
        return {
            status: 403,
            message: "Access forbidden. Login first"
        }
    }

    // check if access token is correct
    const restaurant = await restaurants.findOne({access_token: access_token})
    if (!restaurant) {
        return {
            status: 404,
            message: "Access token invalid."
        }
    }
    return restaurant
}

module.exports = getRestaurantDetails