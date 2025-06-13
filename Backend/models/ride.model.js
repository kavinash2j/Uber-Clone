const mongoose = require("mongoose");

const rideSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    captain: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Captain",
    },
    pickup: {
        type: String,
        required: true
    },
    destination: {
        type: String,
        required: true
    },
    fare: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ["pending", "accepted", "on-going", "completed", "cancelled"],
        default: "pending"
    },
    duration: {
        //in seconds
        type: Number,
    },
    distance: {
        //in meters
        type: Number,
    },
    paymentID: {
        type: String,
    },
    orderID: {
        type: String,
    },
    signature: {
        type: String,
    },
    otp: {
        type: String,
        select: false, // Do not return OTP in queries
        required: true
    }

})

module.exports = mongoose.model("Ride", rideSchema);