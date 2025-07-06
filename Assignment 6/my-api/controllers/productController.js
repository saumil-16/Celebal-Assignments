// controllers/productController.js
const { products, getNextProductId } = require('../data/mockDb'); // Import mock database
const Product = require('../models/Product'); // Import Product model

/**
 * Creates a new product.
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 */
function createProduct(req, res) {
    const { name, price } = req.body;
    if (!name || typeof price === 'undefined') {
        return res.status(400).json({ message: 'Product name and price are required' });
    }

    // req.user is populated by the authenticateToken middleware
    const newProduct = new Product(getNextProductId(), name, price, req.user.id);
    products.push(newProduct);
    res.status(201).json({ message: 'Product created successfully', product: newProduct });
}

/**
 * Gets all products.
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 */
function getAllProducts(req, res) {
    res.status(200).json(products);
}

/**
 * Gets a single product by ID.
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 */
function getProductById(req, res) {
    const productId = parseInt(req.params.id);
    const product = products.find(p => p.id === productId);

    if (!product) {
        return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(product);
}

/**
 * Updates a product by ID.
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 */
function updateProduct(req, res) {
    const productId = parseInt(req.params.id);
    const { name, price } = req.body;

    const productIndex = products.findIndex(p => p.id === productId);

    if (productIndex === -1) {
        return res.status(404).json({ message: 'Product not found' });
    }

    const product = products[productIndex];

    // Optional: Implement ownership check if only the owner can update
    // if (product.userId !== req.user.id) {
    //     return res.status(403).json({ message: 'Forbidden: You do not own this product' });
    // }

    products[productIndex] = {
        ...product,
        name: name || product.name,
        price: typeof price !== 'undefined' ? price : product.price
    };

    res.status(200).json({ message: 'Product updated successfully', product: products[productIndex] });
}

/**
 * Deletes a product by ID.
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 */
function deleteProduct(req, res) {
    const productId = parseInt(req.params.id);
    const initialLength = products.length;
    // Filter out the product to delete
    const updatedProducts = products.filter(p => p.id !== productId);

    if (updatedProducts.length === initialLength) { // If length didn't change, product wasn't found
        return res.status(404).json({ message: 'Product not found' });
    }

    // Update the products array in mockDb
    products.length = 0; // Clear existing array
    products.push(...updatedProducts); // Push filtered products back

    res.status(200).json({ message: 'Product deleted successfully' });
}

module.exports = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct
};
