const express = require('express');
const router = express.Router();

const orderFood = require('../../controller/user/orderFood')

// create new order for a user
router.post('/order_food', async (req, res) => { res.send(await orderFood(req.body)) })

module.exports = router