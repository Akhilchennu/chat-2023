const redis = require('redis');

const reddisConnect = async () => {
    const client = await redis.createClient({
        host: 'localhost', // Redis host
        port: 6379, // Redis port
        // Add any other Redis client options as needed
    });
    client.on('error', err => console.log('Redis Client Error', err));
    await client.connect();
    //example of set and get
    // await client.set('key', 'data');
    // const value = await client.get('key');
    console.log("Reddis connected");
    return client
}

module.exports = reddisConnect()