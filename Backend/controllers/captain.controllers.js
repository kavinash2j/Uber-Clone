const captainModel = require("../models/captain.model");
const captianService = require("../services/captain.services");
const  {validationResult} = require("express-validator");


module.exports.registerCaptain = async (req,res,next)=>{
    const error = validationResult(req);
    if(!error.isEmpty()){
        return res.status(400).json({errors : error.array()});
    }
    const {fullname,email,password,vehicle} = req.body;

    const isCaptainAllreadyExist = await captainModel.findOne({email});
    if(isCaptainAllreadyExist){
        res.status(400).json({message:"captain All ready exist"})
    }

    const hashPassword = await captainModel.hashPassword(password);
    const captain = await captianService.createCaptina({
        firstname:fullname.firstname,
        lastname:fullname.lastname,
        email,
        password:hashPassword,
        color:vehicle.color,
        plate:vehicle.plate,
        capacity:vehicle.capacity,
        vehicleType:vehicle.vehicleType
    })
    const token = captain.generateAuthToken();

    res.status(201).json({token,captain});
}