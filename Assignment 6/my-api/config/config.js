// config/default.js
module.exports = {
    port: process.env.PORT || 3000,
    jwtSecret: process.env.JWT_SECRET || 'your_super_secret_jwt_key', // IMPORTANT: Change this in production! Use environment variables.
    tokenExpiresIn: '1h' // Token expiration time
};
