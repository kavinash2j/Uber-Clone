const express = require("express");
const router = express.Router();
const { body } = require('express-validator');
const authMiddleware = require("../middlewares/auth.middleware");
const rideController = require("../controllers/ride.controllers");

router.post('/create',
    body('pickup').isString().isLength({ min: 3 }).withMessage('Invaild pickup address'),
    body('destination').isString().isLength({ min: 3 }).withMessage('Invalid destination address'),
    body('vehicleType').isIn(['auto', 'bike', 'car']).withMessage('Invalid vehicle type'),
    authMiddleware.authUser,
    rideController.createRide
)

module.exports = router;