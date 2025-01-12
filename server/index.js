const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: 'http://localhost:5173',  // React frontend URL
        methods: ['GET', 'POST']
    }
});

app.use(cors());

let users = [];  // To track users and their rooms

io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    // Handle user joining a room
    socket.on('join_room', ({ username, room }) => {
        const user = { id: socket.id, username, room };
        users.push(user);
        socket.join(room);  // Join the specific room
        console.log(`${username} joined room: ${room}`);
    });

    // Listen for chat messages and broadcast to the room
    socket.on('send_message', ({ room, sender, text }) => {
        console.log(`Message received from ${sender} in room ${room}: ${text}`);
        io.to(room).emit('receive_message', { sender, text });  // Broadcast message to users in the same room
    });

    // Handle user disconnect
    socket.on('disconnect', () => {
        const user = users.find((u) => u.id === socket.id);
        if (user) {
            users = users.filter((u) => u.id !== socket.id);
            console.log(`${user.username} disconnected from room: ${user.room}`);
        }
    });
});

const PORT = 5000;
server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
