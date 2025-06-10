const blacklistTokenModel = require("../models/blacklistToken.model");
const captainModel = require("../models/captain.model");
const captianService = require("../services/captain.services");
const { validationResult } = require("express-validator");


module.exports.registerCaptain = async (req, res, next) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({ errors: error.array() });
    }
    const { fullname, email, password, vehicle } = req.body;

    const isCaptainAlready = await captainModel.findOne({ email });
    if (isCaptainAlready) {
        res.status(400).json({ message: "captain All ready exist" })
    }

    const hashPassword = await captainModel.hashPassword(password);
    const captain = await captianService.createCaptina({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password: hashPassword,
        color: vehicle.color,
        plate: vehicle.plate,
        capacity: vehicle.capacity,
        vehicleType: vehicle.vehicleType
    })
    const token = captain.generateAuthToken();

    res.status(201).json({ token, captain });
}

module.exports.loginCaptain = async function (req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    console.log(email, password)
    const captain = await captainModel.findOne({ email }).select("+password");
    if (!captain) {
        res.status(500).json({ message: "Invalid username or password" });
    }
    const isMatch = await captain.comparePassword(password);

    // console.log(isMatch);
    if (!isMatch) {
        res.status(500).json({ message: "Invalid username or password" });
        console.log("invalid")
    }
    const token = captain.generateAuthToken();
    res.cookie("token", token);
    res.status(200).json({ token, captain });
}
module.exports.logoutCaptian = async function (req, res, next) {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    // const token = req.cookies.token || req.headers.authorization?.split(' ')[1]
    await blacklistTokenModel.create({ token });
    res.clearCookie('token');
    res.status(200).json({ meassage: "logout Successfully" });
}
module.exports.getCaptainProfile = async function (req, res, next) {
    // console.log(req.captian);
    res.status(200).json(req.captian);
}  