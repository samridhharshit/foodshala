const express = require('express')
const router = express.Router()

const register = require("../../controller/auth/register");
const login = require("../../controller/auth/login")
const getUserDetails = require("../../controller/auth/getUserDetails");

// register user/restaurant
router.post('/register', async (req, res) => { res.send(await register(req.body)) })

// logging in a user/restaurant - put request
router.put('/login', async (req, res) => { res.send(await login(req.body)) })

// get user details using access_token
router.get('/get_user_details/:access_token', async (req, res) => { res.send(await getUserDetails(req.params.access_token)) })

module.exports = router