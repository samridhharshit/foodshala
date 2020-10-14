const express = require('express');
const router = express.Router();

const getOrdersForRestaurant = require("../../controller/restaurant/restaurant");
const registerRestaurant = require("../../controller/restaurant/register");

// route to get
router.get('/:id', async (req, res) => { res.send(await getOrdersForRestaurant(req.params.id)) })
router.post('/register-restaurant', async (req, res) => { res.send(await registerRestaurant(req.body)) })


module.exports = router