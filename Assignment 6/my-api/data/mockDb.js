// data/mockDb.js
let users = []; // Stores user objects: { id, username, passwordHash }
let products = []; // Stores product objects: { id, name, price, userId }

let nextUserId = 1;
let nextProductId = 1;

module.exports = {
    users,
    products,
    getNextUserId: () => nextUserId++,
    getNextProductId: () => nextProductId++
};
