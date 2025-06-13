const express = require("express");
const router = express.Router();
const authMiddlewear = require("../middlewares/auth.middleware")
const { getCoordinate, getDistanceAndTime, getAutoCompleteSuggestion } = require("../controllers/Map.controllers");
const { query } = require("express-validator");


router.get('/get-cordinates',
    query('address').notEmpty().withMessage('Address is required'),
    authMiddlewear.authUser, getCoordinate)

router.get('/get-distance-time',
    query('from').notEmpty().withMessage('From address is required'),
    query('to').notEmpty().withMessage('To address is required'),
    authMiddlewear.authUser,
    getDistanceAndTime
)
router.get('/get-suggestion', authMiddlewear.authUser, getAutoCompleteSuggestion)
module.exports = router;