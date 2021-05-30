let data = {};

// QS Parse and Save playerInfo locally HERE

/**
 * Initialize lobby
 * Create room code
 * Make listeners
 * TODO: make room join method and call it in init
 */
function init() {
    const room = createRoomCode();
    document.getElementById('button-send').addEventListener('click', send);
};

/**
 * Generate random room code from A-Z of length 6
 * @returns generated room code
 */
function createRoomCode() {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const charactersLength = 6;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
};

/**
 * Send room setting info to backend, including
 * - room code
 * - number of imposters
 * - round time
 */
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