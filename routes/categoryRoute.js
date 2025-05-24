import express from 'express';
import {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} from '../controller/categoryController.js';

const router = express.Router();

// Create a new category
router.post('/categories', createCategory);

// Get all categories
router.get('/categories', getCategories);

// Get a category by ID
router.get('/categories/:id', getCategoryById);

// Update a category by ID
router.put('/categories/:id', updateCategory);

// Delete a category by ID
router.delete('/categories/:id', deleteCategory);

export default router;
