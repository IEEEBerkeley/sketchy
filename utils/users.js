const redis = require('redis');
const util = require('util');
const REDIS_PORT = process.env.PORT || 6379;
const client = redis.createClient(REDIS_PORT);

// currently stored in redis

const hset = util.promisify(client.hset).bind(client);
const hget = util.promisify(client.hget).bind(client);
const del = util.promisify(client.del).bind(client);
const hdel = util.promisify(client.hdel).bind(client);
const hvals = util.promisify(client.hvals).bind(client);

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
    console.log(client.hget(id, 'room'));
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
    const currentRoom = client.hget(id, 'room');
    console.log(currentRoom);
    const user = await getCurrentUser(id);
    //await del(id);
    await hdel(currentRoom, id);
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