const express = require('express');
const app = express();
const http = require('http');
const { Server } = require("socket.io");
const cors = require('cors');

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
    },
});

io.on("connection", (socket) => {
    console.log(`New user connected ${socket.id}`);

    socket.on("message", (data) => {
        console.log("message: ");
        console.log(data);

        socket.broadcast.emit("receive", data);
    })

    socket.on("whosthere", (data) => {
        console.log("checking whosthere");

        socket.broadcast.emit("whosthere", data);
    })

})

server.listen(19007, () => {
    console.log('Server is running on port 19007');
});