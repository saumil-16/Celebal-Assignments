// controllers/authController.js
const { users, getNextUserId } = require('../data/mockDb'); // Import mock database
const User = require('../models/User'); // Import User model
const { hashPassword, comparePassword } = require('../utils/passwordUtils'); // Password utilities
const { generateToken } = require('../utils/jwtUtils'); // JWT generation utility

/**
 * Registers a new user.
 * Hashes the password before saving.
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 */
async function registerUser(req, res) {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
    }

    if (users.find(u => u.username === username)) {
        return res.status(409).json({ message: 'Username already exists' });
    }

    try {
        const passwordHash = await hashPassword(password);
        const newUser = new User(getNextUserId(), username, passwordHash);
        users.push(newUser);

        res.status(201).json({ message: 'User registered successfully', user: { id: newUser.id, username: newUser.username } });
    } catch (error) {
        console.error('Error during user registration:', error);
        res.status(500).json({ message: 'Server error during registration' });
    }
}

/**
 * Logs in a user and returns a JWT.
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 */
async function loginUser(req, res) {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
    }

    const user = users.find(u => u.username === username);
    if (!user) {
        return res.status(400).json({ message: 'Invalid username or password' });
    }

    try {
        const isMatch = await comparePassword(password, user.passwordHash);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid username or password' });
        }

        const token = generateToken(user);
        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        console.error('Error during user login:', error);
        res.status(500).json({ message: 'Server error during login' });
    }
}

module.exports = {
    registerUser,
    loginUser
};
