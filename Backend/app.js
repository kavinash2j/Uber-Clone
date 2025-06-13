const dotenv = require("dotenv")
dotenv.config();
const express = require("express");
const app = express();
const cors = require('cors')
const userRoutes = require('./routes/user.routes');
const cookies_parser = require("cookie-parser")
const captainRoutes = require("./routes/captian.routes");
const mapRoutes = require('./routes/map.routes')
const rideRoutes = require("./routes/ride.routes");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cookies_parser());

app.get('/', (req, res) => {
    res.send("hello world")
})
app.use("/user", userRoutes);
app.use("/captain", captainRoutes);
app.use('/map', mapRoutes)
app.use("/rides", rideRoutes);

module.exports = app;