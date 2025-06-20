const express = require("express");
const router = express.Router();
const { body, query } = require('express-validator');
const authMiddleware = require("../middlewares/auth.middleware");
const rideController = require("../controllers/ride.controllers");

router.post('/create',
    body('pickup').isString().isLength({ min: 3 }).withMessage('Invaild pickup address'),
    body('destination').isString().isLength({ min: 3 }).withMessage('Invalid destination address'),
    body('vehicleType').isIn(['auto', 'bike', 'car']).withMessage('Invalid vehicle type'),
    authMiddleware.authUser,
    rideController.createRide
)

router.get('/get-fare',
    body('pickup').isString().isLength({ min: 3 }).withMessage('Invalid pickup address'),
    body('destination').isString().isLength({ min: 3 }).withMessage('Invalid destination address'),
    authMiddleware.authUser,
    rideController.fareController
);

router.post('/confirm',
    authMiddleware.authCaptian,
    body('rideId').isMongoId().withMessage('Invalid ride id'),
    rideController.confrimRide
)

router.get('/start-ride',
    query('rideId').isMongoId().withMessage('Invalid ride id'),
    query('otp').isString().isLength({ min: 6, max: 6 }).withMessage('Invaild otp'),
    rideController.startRide
)

router.post('/end-ride',
    authMiddleware.authCaptian,
    body('rideId').isMongoId().withMessage('Invalid ride id'),
    rideController.endRide
)

module.exports = router;