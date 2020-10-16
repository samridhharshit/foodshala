const express = require('express');
const router = express.Router();

const orderFood = require('../../controller/user/orderFood')

// create new order for a user
router.post('/order_food', async (req, res) => { res.send(await orderFood(req.body)) })

// get user details using access_token
router.get('/get_user_details/:access_token', async (req, res) => { res.send(await getUserDetails(req.params.access_token)) })

module.exports = router