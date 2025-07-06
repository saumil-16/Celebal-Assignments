// utils/passwordUtils.js
const bcrypt = require('bcryptjs');

/**
 * Hashes a plain-text password.
 * @param {string} password - The plain-text password to hash.
 * @returns {Promise<string>} A promise that resolves with the hashed password.
 */
async function hashPassword(password) {
    const salt = await bcrypt.genSalt(10); // Generate a salt with a cost factor of 10
    return await bcrypt.hash(password, salt);
}

/**
 * Compares a plain-text password with a hashed password.
 * @param {string} plainPassword - The plain-text password.
 * @param {string} hashedPassword - The hashed password to compare against.
 * @returns {Promise<boolean>} A promise that resolves with true if passwords match, false otherwise.
 */
async function comparePassword(plainPassword, hashedPassword) {
    return await bcrypt.compare(plainPassword, hashedPassword);
}

module.exports = {
    hashPassword,
    comparePassword
};
