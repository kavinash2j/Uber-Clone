const userModel = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const captainModel = require("../models/captain.model");
const blacklistTokenModel = require('../models/blacklistToken.model');

module.exports.authUser = async function (req, res, next) {
    const token = req.cookies.token || req.headers.authorization.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const isBlacklisted = await blacklistTokenModel.findOne({ token: token });
    if (isBlacklisted) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    // console.log(token);
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findOne({ _id: decoded._id })
        req.user = user;
        return next();

    } catch (error) {
        return res.status(401).json({ message: 'Unauthorized Access' })
    }
}

module.exports.authCaptian = async function (req, res, next) {
    const token = req.cookies.token || req.headers.authorization.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const isBlacklisted = await blacklistTokenModel.findOne({ token: token });
    if (isBlacklisted) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const captian = await captainModel.findOne({ _id: decoded._id })
        req.captian = captian;
        // console.log("captain service id called")
        // console.log(req.captian)
        return next();

    } catch (error) {
        return res.status(401).json({ message: 'Unauthorized Access' })
    }
}