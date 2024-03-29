const redis = require('redis');

const reddisConnect = async () => {
    const client = redis.createClient({
        host: "172.30.0.2",
        port: 6379, // Redis port
        // Add any other Redis client options as needed
    });
    // const client = redis.createClient({
    //     url: 'redis://172.30.0.2',
    //     legacyMode: true,
    // });
    client.on('error', err => console.log('Redis Client Error', err));
    await client.connect();
    //example of set and get
    // await client.set('key', 'data');
    // const value = await client.get('key');
    console.log("Reddis connected");
    return client
}

module.exports = reddisConnect()