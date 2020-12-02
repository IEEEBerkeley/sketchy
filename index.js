require('dotenv').config();

const path = require('path');

// Const { v4: uuidv4 } = require('uuid');
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
	socket.on('joinRoom', async data => {
		const room = data.roomName;
		const username = data.username;
		const user = await userJoin(socket.id, username, room).catch(console.error);
		socket.join(user.room);

		// Broadcast when a user connects
		socket.broadcast
			.to(user.room)
			.emit('message', formatMessage(botName, `${user.username} has joined`, 'join'));

		// Send users and room info
		io.to(user.room).emit('roomUsers', {
			room: user.room,
			users: await getRoomUsers(user.room).catch(console.error)
		});
	});

	// Runs when client disconnects
	socket.on('disconnecting', async () => {
		const user = await userLeave(socket.id).catch(console.error);

		if (user) {
			io.to(user.room).emit('message', formatMessage(botName, `${user.username} has left`, 'leave'));

			// Send users and room info
			io.to(user.room).emit('roomUsers', {
				room: user.room,
				users: await getRoomUsers(user.room).catch(console.error)
			});
		}
	});

	// Listen for chatMessage
	socket.on('chatMessage', async msg => {
		const user = await getCurrentUser(socket.id);

		io.to(user.room).emit('message', formatMessage(user.username, msg));
	});

	// Listen for canvas updates (draw)
	socket.on('draw', data => {
		io.emit('draw', data);
	});
});

server.listen(PORT, () => console.log('Active on port:', PORT));
