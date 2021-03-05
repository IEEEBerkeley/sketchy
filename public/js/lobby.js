let data = {};

function init() {
    const room = createRoom();
    document.getElementById('button-send').addEventListener('click', send);
};

function createRoom() {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const charactersLength = 6;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
};

function send() {
    let numImposters = document.getElementById('numImposters');
    let roundtime = document.getElementById('roundtime');
    data['room'] = room;
    data['numImposters'] = parseInt(numImposters.value);
    data['roundtime'] = parseInt(roundtime.value);
    //console.log(data);
    socket.emit('room-settings', data);
}

document.addEventListener('DOMContentLoaded', init);