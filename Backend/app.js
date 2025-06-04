const dotenv = require("dotenv")
dotenv.config();
const express = require("express");
const app = express();
const cors = require('cors')
const userRoutes = require('./routes/user.routes');
const cookies_parser = require("cookie-parser")


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cookies_parser());

app.get('/',(req,res)=>{
    res.send("hello world")
})
app.use("/user",userRoutes);
module.exports = app;