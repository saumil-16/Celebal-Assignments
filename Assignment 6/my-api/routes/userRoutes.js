const express = require('express');
const UserController = require('../controllers/userController');

const router = express.Router();

router.get('/', UserController.getAllUsers);
router.get('/:id', UserController.getUserById);
router.post('/', UserController.createUser);
router.put('/:id', UserController.updateUser);
router.patch('/:id', UserController.partialUpdateUser);
router.delete('/:id', UserController.deleteUser);

module.exports = router;