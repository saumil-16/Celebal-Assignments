// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const config = require('../config/default'); // Import your config

/**
 * Middleware to authenticate requests using JWT.
 * Checks for a valid token in the Authorization header.
 * If valid, decodes the token and attaches user info to req.user.
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 * @param {function} next - Express next middleware function.
 */
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Expected format: "Bearer TOKEN"

    if (!token) {
        return res.status(401).json({ message: 'Access Denied: No token provided' });
    }

    jwt.verify(token, config.jwtSecret, (err, user) => {
        if (err) {
            console.error('JWT Verification Error:', err.message);
            // Specifically check for 'TokenExpiredError' if you want a different message
            if (err.name === 'TokenExpiredError') {
                return res.status(403).json({ message: 'Access Denied: Token expired' });
            }
            return res.status(403).json({ message: 'Access Denied: Invalid token' });
        }
        req.user = user; // Attach decoded user payload to request
        next(); // Proceed to the next route handler
    });
}

module.exports = authenticateToken;
