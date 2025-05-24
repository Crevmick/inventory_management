import express from 'express';
import { upload } from '../middleware/multerConfig.js';
import { createProduct, updateProduct, deleteProduct } from '../controller/productController.js';

const router = express.Router();

// Endpoint to create productn]
router.post('/products', upload.single('image'), createProduct);
router.put('/products/:id', upload.single('image'), updateProduct);
router.delete('/products/:id', deleteProduct);


export default router;
