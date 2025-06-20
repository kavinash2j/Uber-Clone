const app = require("./app");
const http = require("http");
const port = process.env.port || 3000;
const { initializeSocket } = require('./socket')
const database = require("./db/db.js")
database();

const server = http.createServer(app);

initializeSocket(server);

server.listen(port, () => {
    console.log("app is listing on the port ", port)
});
