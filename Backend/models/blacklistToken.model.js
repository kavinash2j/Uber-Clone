const mongoose = require("mongoose");

let blacklistTokenSchema = new mongoose.Schema({
    token:{
        type:String,
        require : true,
        unique:true,
    },
    createdAt:{
        type:Date,
        default:Date.now,
        expires:60*60*24,
    }
})

module.exports = mongoose.model('BlacklistToken',blacklistTokenSchema);