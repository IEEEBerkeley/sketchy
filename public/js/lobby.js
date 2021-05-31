let data = {};

// QS Parse and Save playerInfo locally HERE

/**
 * Initialize lobby
 * Create room code
 * Make listeners
 * TODO: make room join method and call it in init
 */
function init() {
    // see create() and join(). the two are the same for now. 
};

function create() {
    /**
     * user clicked the 'create game' button. 
     * creates a lobby with a randomly generated room code.
     */
    const { username, room } = Qs.parse(location.search, {
        ignoreQueryPrefix: true
    });
    playerSave(username, room);

    const info = JSON.parse(localStorage.getItem('user-info'));
    socket.emit('joinRoom', info);
    document.getElementById('button-send').addEventListener('click', send);
}

function join() {
    /**
     * user entered a valid 6 letter room code. 
     * joins an existing room. 
     */

    const { username, room } = Qs.parse(location.search, {
        ignoreQueryPrefix: true
    });
    playerSave(username, room);

    const info = JSON.parse(localStorage.getItem('user-info'));
    socket.emit('joinRoom', info);
    document.getElementById('button-send').addEventListener('click', send);
}

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