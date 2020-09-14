const express = require('express');
const router = express.Router();

const { makePayment } = require('../controllers/stripePayment.controllers');




router.post('/make/stripepayment', makePayment);

module.exports = router;