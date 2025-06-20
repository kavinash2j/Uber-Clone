const { Socket } = require("dgram");
const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

let userSchema = new mongoose.Schema({
    fullname: {
        firstname: {
            type: String,
            require: true,
            minlength: [3, "first name atleast of the 3 character"],
        },
        lastname: {
            type: String,
            minlength: [3, "last name ataleast of the 3 character"],
        }
    },
    email: {
        type: String,
        require: true,
        unique: true,
        minlength: [5, "atleast email must 5 or upper"],
    },
    password: {
        type: String,
        require: true,
        select: false,
    },
    socketId: {
        type: String,
    }

})

userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn: '24h' })
    return token;
}

userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}
userSchema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password, 10);
}

const userModel = mongoose.model('user', userSchema);

module.exports = userModel;