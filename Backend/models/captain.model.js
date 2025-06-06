const { match } = require("assert");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt")

const captainSchema = mongoose.Schema({
    fullname:{
        firstname:{
            type:String,
            require:true,
            minlength : [3,"in firstname atleast 3 charactre are needed"]
        },
        lastname:{
            type:String,
            require:true,
            minlength:[3,"in lastname atleast 3 character are needed"]
        }
    },
    email:{
        type:String,
        require:true,
        unique:true,
        lowercase:true,
        // match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Please fill a valid email address"],
    },
    password:{
        type:String,
        require:true,
        select:false,
    },
    socketId:{
        type:String,
    },
    status:{
        type:String,
        enum:['active','inactive'],
        default:'inactive',
    },
    vehicle:{
        color:{
            type:String,
            require:true,
            minlength:[3,"color must be at least 3 character long"]
        },
        plate:{
            type:String,
            require:true,
            unique:true,
            minlength:[3,"plate must be at least 3 character long"]
        },
        capacity:{
            type:Number,
            require:true,
            min:[1,"capacity must be at least 1"]
        },vehicleType:{
            type:String,
            require:true,
            enum:['car','bike','auto'],
        }
    },
    location:{
        latitude:{
            type:Number,
        },longitude:{
            type:Number,
        }
    }
})

captainSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({_id:this._id},process.env.JWT_SECRET,{expiresIn:'24h'})
    return token;
}
captainSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password,this.password);
}
captainSchema.statics.hashPassword = async function(password) { 
    return await bcrypt.hash(password,10);
}

module.exports = mongoose.model('captain', captainSchema);
