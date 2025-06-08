const express = require("express");
const router = express.Router();
const {body} = require("express-validator");
const captianController = require("../controllers/captain.controllers")
const authMiddlewear = require("../middlewares/auth.middleware")

router.post('/register',[
    body('email').isEmail().withMessage('Invalid Email'),
    body('fullname.firstname').isLength({min:3}).withMessage("first name must be at least 3 character long"),   
    body('fullname.lastname').isLength({min:3}).withMessage("last name must be at least 3 character long"),
    body('password').isLength({min:6}).withMessage('password must be at least 6 character long'),
    body('vehicle.color').isLength({min:3}).withMessage("color must be at least 3 character long"),
    body('vehicle.plate').isLength({min:3}).withMessage("plate must be at least 3 character long"),
    body('vehicle.capacity').isNumeric().withMessage("capacity must be a number"),
    body('vehicle.vehicleType').isIn(['car', 'bike', 'auto']).withMessage("vehicle type must be one of car, bike, or auto")
],captianController.registerCaptain)

router.post('/login',[
    body('email').isEmail().withMessage('Invalid Email'),
    body('password').isLength({min:6}).withMessage('password must be at least 6 character long'),
],captianController.loginCaptain)

router.get("/profile",authMiddlewear.authCaptian,captianController.getCaptainProfile);
router.get("/logout",authMiddlewear.authCaptian,captianController.logoutCaptian);
module.exports = router;
