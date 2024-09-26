const express = require('express');
const {addCalculation, getCalculation}= require('../controllers/calculationController');
const { verifyToken } = require('jsonwebtoken');

const router = express.Router();

router.post('/',verifyToken,addCalculation);
router.get('/',verifyToken,getCalculation);

module.exports = router;