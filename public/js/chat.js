const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');
const roomName = document.getElementById('room-name');
const userList = document.querySelector('.players');

// Get username and room from URL
const { username, room } = Qs.parse(location.search, {
    ignoreQueryPrefix: true
});

const socket = io();

// Sanitize XSS
const sanitize = (() => {
    const t = document.createElement('div');
    return input => (t.textContent = input, t.innerHTML);
})()

// Store player info locally
playerSave(username, room);

// Join chatroom
const info = JSON.parse(localStorage.getItem('user-info'));
console.log(info);
socket.emit('joinRoom', info);

// Get room and users (Re-add when we need it)
socket.on('roomUsers', ({ room, users }) => {
    //outputRoomName(room);
    console.log(users);
    outputUsers(users);
    console.log(userList);
})

// Message from server
socket.on('message', message => {
    outputMessage(message);

    // Scroll Down
    chatMessages.scrollTop = chatMessages.scrollHeight;
});

// Message submit
chatForm.addEventListener('submit', e => {
    e.preventDefault();

    // Get message text
    const msg = e.target.elements.msg.value;

    // Emit message to server
    socket.emit('chatMessage', sanitize(msg));

    // Clear input
    e.target.elements.msg.value = '';
    e.target.elements.msg.focus();
});

// Output message to DOM
function outputMessage(message){
    const div = document.createElement('div');
    let color = 'black';
    div.classList.add('message')
    if (message.type !== 'normal') {
        switch (message.type) {
            case 'join':
                color = 'green';
                break;
            case 'leave':
                color = 'red';
                break;
        }
        div.innerHTML = `<p class="text" style="color: ${color}">${message.text}</p>`;
    } else {
        div.innerHTML = `<p class="text">
		    <b>${message.username}:</b> ${message.text}					
        </p>`;
    }
    chatMessages.appendChild(div);
}

// Add room name to DOM
function outputRoomName(room) {
    roomName.innerText = room;
}

// Add users to DOM
function outputUsers(users) {
    userList.innerHTML = `
        ${users.map(user => `<div class="player">${user}</div>`).join('')}
    `;
}
