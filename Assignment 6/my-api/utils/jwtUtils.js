// utils/jwtUtils.js
const jwt = require('jsonwebtoken');
const config = require('../config/default'); // Import your config

/**
 * Generates a JSON Web Token for a given user.
 * @param {object} user - The user object (must contain id and username).
 * @returns {string} The generated JWT.
 */
function generateToken(user) {
    return jwt.sign(
        { id: user.id, username: user.username },
        config.jwtSecret,
        { expiresIn: config.tokenExpiresIn }
    );
}

module.exports = {
    generateToken
};
