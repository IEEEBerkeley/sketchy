require('dotenv').config();

const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const formatMessage = require('./utils/messages.js');
const {
	userJoin, getCurrentUser, userLeave, getRoomUsers
} = require('./utils/users.js');

const PORT = process.env.PORT || 8080;

const app = express();
const server = http.createServer(app);
const io = socketio(server);
const botName = '';

// Use all files in "public" as static content
app.use(express.static(`${__dirname}/public`));

// Run when client connects
io.on('connection', socket => {
	socket.on('joinRoom', ({
		username, room
	}) => {
		const user = userJoin(socket.id, username, room);

		socket.join(user.room);

		// Welcome current user
		socket.emit('message', formatMessage(botName, 'Welcome to Sketchy.io!'));

		// Broadcast when a user connects
		socket.broadcast
			.to(user.room)
			.emit('message', formatMessage(botName, `${user.username} has joined`));

		// Send users and room info
		io.to(user.room).emit('roomUsers', {
			room: user.room,
			users: getRoomUsers(user.room)
		});
	});

	// Runs when client disconnects
	socket.on('disconnect', () => {
		const user = userLeave(socket.id);

		if (user) {
			io.to(user.room).emit('message', formatMessage(botName, `${user.username} has left`));

			// Send users and room info
			io.to(user.room).emit('roomUsers', {
				room: user.room,
				users: getRoomUsers(user.room)
			});
		}
	});

	// Listen for chatMessage
	socket.on('chatMessage', msg => {
		const user = getCurrentUser(socket.id);

		io.to(user.room).emit('message', formatMessage(user.username, msg));
	});
});

server.listen(PORT, () => console.log('Active on port:', PORT));
