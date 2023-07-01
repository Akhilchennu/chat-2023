const jwt = require('jsonwebtoken');
const config = require('../../config');
const reddisClient=require('../configarations/reddisConfig');

const auth =async (token) => {
    try {
        const decodedPayload = jwt.verify(token, config.jwtSecret);
        const isTokenExists=await (await reddisClient).sIsMember(decodedPayload['_id'],token);
        if(!Boolean(isTokenExists)){
            return { success: false, error: "Invalid token" };
        }
        return { success: true, decodedPayload,userId:decodedPayload['_id'] };
    } catch (error) {
        return { success: false, error: error };
    }

}


module.exports = auth