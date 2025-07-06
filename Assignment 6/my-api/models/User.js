// models/User.js
// This file would typically define a Mongoose schema or a Sequelize model
// For our mock database, it's more conceptual.
class User {
    constructor(id, username, passwordHash) {
        this.id = id;
        this.username = username;
        this.passwordHash = passwordHash;
    }
}

module.exports = User;
