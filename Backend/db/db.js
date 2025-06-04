const mongoose = require("mongoose");
const url = process.env.DB_URL;

function connectToDb(){
    mongoose.connect(url).then(()=>{
        console.log("database is connect successfully");
    })
    .catch(err =>{
        console.log(err);
    })
}
module.exports = connectToDb;