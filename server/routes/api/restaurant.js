const express = require('express');
const router = express.Router();

const getOrdersForRestaurant = require("../../controller/restaurant/restaurant");

// route to get
router.get('/:id', async (req, res) => { res.send(await getOrdersForRestaurant(req.params.id)) })


module.exports = router