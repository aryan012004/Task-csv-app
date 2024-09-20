// server.js
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

let tasks = [];

io.on('connection', (socket) => {
    console.log('A user connected');

    // Send current tasks to the newly connected user
    socket.emit('updateTasks', tasks);

    socket.on('addTask', (task) => {
        tasks.push(task);
        io.emit('updateTasks', tasks);
    });

    socket.on('deleteTask', (id) => {
        tasks = tasks.filter(task => task.id !== id);
        io.emit('updateTasks', tasks);
    });

    socket.on('completeTask', (id) => {
        tasks = tasks.map(task => task.id === id ? { ...task, isCompleted: true } : task);
        io.emit('updateTasks', tasks);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

server.listen(4000, () => {
    console.log('Server is running on port 4000');
});
