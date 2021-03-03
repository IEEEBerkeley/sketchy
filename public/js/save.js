// All things related to Frontend Player credentials

// Retrieve and store user info
function playerSave(name, room) {
    console.log('yay it worked');

    const userInfo = {
        //Id: userId,
        roomName: room,
        username: name
    };

    // clear local storage first
    localStorage.clear();

    // stores with userId as key and object containing username and roomname as values
    localStorage.setItem('user-info', JSON.stringify(userInfo));

    console.log(localStorage.getItem('user-info'));
}
