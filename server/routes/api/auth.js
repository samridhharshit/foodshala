const express = require('express')
const router = express.Router()

const register = require("../../controller/auth/register");
const login = require("../../controller/auth/login")

// register user/restaurant
router.post('/register', async (req, res) => { res.send(await register(req.body)) })

// logging in a user/restaurant
router.post('/login', async (req, res) => { res.send(await login(req.body)) })
module.exports = router