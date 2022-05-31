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


server.listen(19007, () => {
    console.log('Server is running on port 19007');
});