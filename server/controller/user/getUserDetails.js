const users = require('../../database/models/users')

const getUserDetails = async (access_token) => {
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
    const user = await users.findOne({access_token: access_token})
    if (!user) {
        return {
            status: 404,
            message: "Access token invalid."
        }
    }
    return user
}

module.exports = getUserDetails