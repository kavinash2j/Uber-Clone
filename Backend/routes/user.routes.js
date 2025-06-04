const express = require("express");
const route = express.Router();
const { body } = require("express-validator");
const userContoller = require("../controllers/user.controllers")

route.post('/register', [
    body('email').isEmail().withMessage('Invalid Email'),
    body('fullname.firstname').isLength({ min: 3 }).withMessage("first name must be at least 3 character long"),
    body('password').isLength({ min: 6 }).withMessage('password must be at least 6 character long')
], userContoller.registerUser)


route.post('/login', [
    body('email').isEmail().withMessage('Invalid Email'),
    body('password').isLength({ min: 6 }).withMessage('password must be at least 6 character long')
], userContoller.loginUser)

module.exports = route;
