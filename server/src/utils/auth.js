const jwt = require('jsonwebtoken');
const config = require('../../config')

const auth = (token) => {
    try {
        const decodedPayload = jwt.verify(token, config.jwtSecret);
        return { success: true, decodedPayload };
    } catch (error) {
        return { success: false, error: error };
    }

}


module.exports = auth