const {
    hset, hget, hvals, hdel
} = require('./redis');

// currently stored in redis

// promisified redis commands


// function hset(key, field, value) {
//     return new Promise((resolve, reject) => {
//         client.hset(key, field, value, (err, data) => {
//             if (err) {
//                 reject(new Error(err));
//             } else {
//                 resolve(data);
//             }
//         });
//     })
// }

// function hget(key, field) {
//     return new Promise((resolve, reject) => {
//         client.hget(key, field, (err, data) => {
//             if (err) {
//                 reject(new Error(err));
//             } else {
//                 resolve(data);
//             }
//         });
//     })
// }

// Join user to chat
async function userJoin(id, username, room) {
    
    const user = { id, username, room };

    // Add id mapped to username and room
    await hset(id, 'username', username);
    await hset(id, 'room', room);

    // Add room mapped to id (field) and username (val)
    await hset(room, id, username);
    return user;
}

// Get current user (returns Promise)
async function getCurrentUser(id) {
    const username = await hget(id, 'username');
    const room = await hget(id, 'room')
    return { id, username, room };
}

// User leaves chat
async function userLeave(id) {
    const currentRoom = await hget(id, 'room');
    console.log(currentRoom);
    const user = await getCurrentUser(id);
    //await del(id);
    await hdel(currentRoom, id);
    console.log(id);
    console.log(user);
    return user;
}

// Get room users (returns Promise)
function getRoomUsers(room) {
    // Usernames are the values
    console.log(room);
    return hvals(room);
}

module.exports = {
    userJoin,
    getCurrentUser,
    userLeave,
    getRoomUsers
}