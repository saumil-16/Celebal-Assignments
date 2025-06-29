const UserModel = require('../models/userModel');
const { validateUser, validatePartialUser } = require('../utils/validation');

class UserController {
  static async getAllUsers(req, res) {
    try {
      const { name, email } = req.query;
      const users = UserModel.getAll({ name, email });
      
      res.json({
        success: true,
        data: users,
        total: users.length
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }

  static async getUserById(req, res) {
    try {
      const user = UserModel.getById(req.params.id);
      
      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'User not found'
        });
      }

      res.json({
        success: true,
        data: user
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }

  static async createUser(req, res) {
    try {
      const { name, email, age } = req.body;
      
      // Validate input
      const errors = validateUser(req.body);
      if (errors.length > 0) {
        return res.status(400).json({
          success: false,
          message: 'Validation failed',
          errors: errors
        });
      }

      // Check if email already exists
      if (UserModel.emailExists(email)) {
        return res.status(409).json({
          success: false,
          message: 'User with this email already exists'
        });
      }

      const newUser = UserModel.create({ name, email, age });

      res.status(201).json({
        success: true,
        message: 'User created successfully',
        data: newUser
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }

  static async updateUser(req, res) {
    try {
      const { name, email, age } = req.body;
      
      // Validate input
      const errors = validateUser(req.body);
      if (errors.length > 0) {
        return res.status(400).json({
          success: false,
          message: 'Validation failed',
          errors: errors
        });
      }

      // Check if email already exists (excluding current user)
      if (UserModel.emailExists(email, parseInt(req.params.id))) {
        return res.status(409).json({
          success: false,
          message: 'User with this email already exists'
        });
      }

      const updatedUser = UserModel.update(req.params.id, { name, email, age });
      
      if (!updatedUser) {
        return res.status(404).json({
          success: false,
          message: 'User not found'
        });
      }

      res.json({
        success: true,
        message: 'User updated successfully',
        data: updatedUser
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }

  static async partialUpdateUser(req, res) {
    try {
      const { name, email, age } = req.body;
      
      // Validate only provided fields
      const errors = validatePartialUser(req.body);
      if (errors.length > 0) {
        return res.status(400).json({
          success: false,
          message: 'Validation failed',
          errors: errors
        });
      }

      // Check email uniqueness if email is being updated
      if (email && UserModel.emailExists(email, parseInt(req.params.id))) {
        return res.status(409).json({
          success: false,
          message: 'User with this email already exists'
        });
      }

      const updatedUser = UserModel.partialUpdate(req.params.id, { name, email, age });
      
      if (!updatedUser) {
        return res.status(404).json({
          success: false,
          message: 'User not found'
        });
      }

      res.json({
        success: true,
        message: 'User updated successfully',
        data: updatedUser
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }

  static async deleteUser(req, res) {
    try {
      const deletedUser = UserModel.delete(req.params.id);
      
      if (!deletedUser) {
        return res.status(404).json({
          success: false,
          message: 'User not found'
        });
      }

      res.json({
        success: true,
        message: 'User deleted successfully',
        data: deletedUser
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }
}

module.exports = UserController;