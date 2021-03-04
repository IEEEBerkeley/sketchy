// Redis connection module

// Redis-server port (default: 6379)
const REDIS_PORT = process.env.PORT || 6379;

const util = require('util')
const client = require('redis').createClient(REDIS_PORT);

// Promisified Commands
const hset = util.promisify(client.hset).bind(client);
const hget = util.promisify(client.hget).bind(client);
const hdel = util.promisify(client.hdel).bind(client);
const hvals = util.promisify(client.hvals).bind(client);

module.exports = { 
    client: client,
    hset: hset,
    hget: hget,
    hdel: hdel,
    hvals: hvals
};