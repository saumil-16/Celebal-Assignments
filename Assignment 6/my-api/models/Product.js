// models/Product.js
// This file would typically define a Mongoose schema or a Sequelize model
// For our mock database, it's more conceptual.
class Product {
    constructor(id, name, price, userId) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.userId = userId; // To associate with the user who created it
    }
}

module.exports = Product;
